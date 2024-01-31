from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .serializers import UserRegistrationSerializer
from django.contrib.auth import authenticate
from .serializers import ProductSerializer
from rest_framework import generics
from .models import Product,Order, OrderDetail
from rest_framework.permissions import IsAuthenticated
from .serializers import OrderSerializer
from rest_framework.generics import CreateAPIView
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail, get_connection
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.permissions import IsAdminUser


@api_view(['POST'])
def send_password_reset_email(request):
    if request.method == 'POST':
        email = request.data.get('email')  # Get email from request data
        if not email:
            return Response({"error": "Email is required"}, status=400)

        try:
            connection = get_connection()
            connection.open()

            send_mail(
                "Password Reset Request",
                "Here is the message to reset your password.",
                settings.EMAIL_HOST_USER,
                [email],  # Use the provided email address
                fail_silently=False,
                connection=connection,
            )

            connection.close()
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        return Response({"message": "Email sent successfully"})

    return Response({"message": "POST request required"}, status=400)
class OrderListCreateView(CreateAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        try:
            order_details_data = self.request.data.get('order_details', [])
            
            total_amount = self.request.data.get('total_amount', 0)
            user = self.request.user

            # Create the order
            order = serializer.save(user=user, total_amount=total_amount)

            # Create associated order details
            OrderDetail.objects.bulk_create([
                OrderDetail(order=order, **detail) for detail in order_details_data
            ])

            return JsonResponse({'message': 'Order placed successfully!', 'order_id': order.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
class OrderDetailView(generics.RetrieveAPIView):
   
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Assuming UserRegistrationSerializer includes 'name' field
            user_serializer = UserSerializer(user)
            
            return Response({'message': 'User registered successfully', 'user': user_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is not None:
            # User is authenticated, generate access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Serialize user data
            serializer = UserSerializer(user)

            return Response({'access_token': access_token, 'user': serializer.data}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    