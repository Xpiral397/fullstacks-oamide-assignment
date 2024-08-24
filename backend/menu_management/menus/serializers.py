from rest_framework import serializers
from .models import MenuNode


class MenuNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuNode
        fields = ["id", "name", "parent", "depth", "children"]
