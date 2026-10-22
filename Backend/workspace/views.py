from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Asset, Board, Galaxy
from .serializers import AssetSerializer, GalaxySerializer, BoardSerializer


# Create your views here.

class BoardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        board_id = request.query_params.get('board_id')

        company = request.user.userprofile.company
        board = Board.objects.filter(company=company).filter(id=board_id).first()
        if not board:
            return Response({
                "error":"Board not found"
            },
            status=status.HTTP_404_NOT_FOUND
            )
        galaxy = Galaxy.objects.filter(board=board).prefetch_related('assets').all()

        galaxies_response = []
        for g in galaxy:
            assets= [
                {"id": asset.id, 
                 "name": asset.title, 
                 "file": asset.file.url, 
                 "x_position": asset.x_position, 
                 "y_position": asset.y_position, 
                 "uploaded_by": asset.uploaded_by.id,
                } for asset in g.assets.all()
            ]
            galaxies_response.append({
                "id": g.id,
                "name": g.name,
                "x_position": g.x_position,
                "y_position": g.y_position,
                "width": g.width,
                "height": g.height,
                "assets": assets
            })

        return Response({
            "company": company.name,
            "id": board.id,
            "board": board.name,
            "board_type": board.board_type,
            "galaxies": galaxies_response
        })


class AssetView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response({"Success":"True", "data":serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"Success":"False", "errors":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        asset_instance = get_object_or_404(Asset, id=pk)
        serializer = AssetSerializer(asset_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response({"Success":"True", "data":serializer.data}, status=status.HTTP_200_OK)
        
        return Response({"Success":"False", "errors":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

