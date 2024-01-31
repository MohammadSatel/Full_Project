from django.urls import path
from .views import (
    LoginView,
    UserRegistrationView,
    ProductList,
    OrderListCreateView,
    OrderDetailView,
    send_password_reset_email,
    ProductDetailView,  # Added for viewing individual products
    ProductListCreateView,  # Added for creating new products
    ProductDetailView,  # Added for updating existing products
    ProductDetailView,  # Added for deleting products
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('products/', ProductList.as_view(), name='product-list'),  # List products
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),  # View individual product
    path('products/create/', ProductListCreateView.as_view(), name='product-create'),  # Create new product
    path('products/update/<int:pk>/', ProductDetailView.as_view(), name='product-update'),  # Update product
    path('products/delete/<int:pk>/', ProductDetailView.as_view(), name='product-delete'),  # Delete product
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('send-password-reset-email/', send_password_reset_email, name='send_password_reset_email'),
]
