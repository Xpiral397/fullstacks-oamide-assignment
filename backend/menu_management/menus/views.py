from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MenuNode
from .serializers import MenuNodeSerializer


class MenuNodeListCreate(APIView):
    def get(self, request):
        nodes = MenuNode.objects.all()
        serializer = MenuNodeSerializer(nodes, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Note: Ensure the data is in the format of a list of dictionaries
        MenuNode.objects.all().delete()
        serializer = MenuNodeSerializer(data=request.data, many=True)
        if serializer.is_valid():
            created_nodes = serializer.save()
            return Response(
                MenuNodeSerializer(created_nodes, many=True).data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
