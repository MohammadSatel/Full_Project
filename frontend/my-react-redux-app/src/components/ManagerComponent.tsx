import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  Product,
} from '../features/products/productsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerComponent: React.FC = () => {
  const [productData, setProductData] = useState<Product>({ id: 0, name: '', price: 0, description: '', image: null });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('description', productData.description);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    if (editingProductId !== null) {
      dispatch(updateProduct({ id: editingProductId, formData }));
    } else {
      dispatch(createProduct({ formData }));
    }

    setProductData({ id: 0, name: '', price: 0, description: '', image: null });
    setEditingProductId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleEdit = (product: Product) => {
    setProductData(product);
    setEditingProductId(product.id);
    if (typeof product.image === 'string') {
      setPreviewUrl(product.image);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Form inputs with Bootstrap styling */}
        <div className="form-group mb-3">
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} placeholder="Name" className="form-control" />
        </div>
        <div className="form-group mb-3">
          <input type="number" name="price" value={productData.price.toString()} onChange={handleInputChange} placeholder="Price" className="form-control" />
        </div>
        <div className="form-group mb-3">
          <textarea name="description" value={productData.description} onChange={handleInputChange} placeholder="Description" className="form-control"></textarea>
        </div>
        <div className="form-group mb-3">
          <input type="file" onChange={handleFileChange} className="form-control-file" />
        </div>
        {previewUrl && <img src={previewUrl} alt="Preview" className="img-thumbnail mb-3" />}
        <button type="submit" className="btn btn-primary">{editingProductId ? 'Update Product' : 'Add Product'}</button>
      </form>
      
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={typeof product.image === 'string' ? product.image : 'http://127.0.0.1:8000/static/images/placeholder.png'} 
                alt={product.name} 
                onError={(e) => (e.currentTarget.src = 'http://127.0.0.1:8000/static/images/placeholder.png')}
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button onClick={() => handleEdit(product)} className="btn btn-sm btn-outline-secondary">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-outline-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerComponent;
