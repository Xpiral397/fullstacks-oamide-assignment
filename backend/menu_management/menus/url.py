from django.urls import path
from .views import MenuNodeListCreate

urlpatterns = [
    path("nodes/", MenuNodeListCreate.as_view(), name="menu-node-list-create"),
]
