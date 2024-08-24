from rest_framework import serializers
from .models import MenuNode


class MenuNodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = MenuNode
        fields = ["id", "name", "parent", "depth", "children"]

    def get_children(self, obj):
        children = obj.children.all()
        return MenuNodeSerializer(children, many=True).data
