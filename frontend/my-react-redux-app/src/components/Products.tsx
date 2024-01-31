import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { Product, fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Cart from './Cart';

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Accessing the products from the Redux state
  const { products, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleBuyClick = (product: Product) => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Products</h2>
      <p className="text-center mb-4">Prices are per day, gas and insurance is included</p>


      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card border-secondary">
              {/* Handle the image display appropriately */}
              {typeof product.image === 'string' && (
                <img src={product.image} alt={product.name} className="card-img-top" />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => handleBuyClick(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Cart />
      </div>
    </div>
  );
};

export default Products;
