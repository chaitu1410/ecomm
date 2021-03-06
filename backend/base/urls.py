from django.urls import path
from .views import MyTokenObtainPairView

from . import views

urlpatterns = [
    path("users/login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/profile/", views.getUserProfile, name="user-profile"),
    path("users/", views.getUsers, name="users"),
    path("users/register/", views.registerUser, name="register"),
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>", views.getProduct, name="product"),
]
