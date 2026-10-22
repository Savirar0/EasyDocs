from rest_framework import serializers
from .models import Asset, Galaxy, Board

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model=Asset
        fields = ['id', 'galaxy', 'title', 'file', 'x_position', 'y_position', 'uploaded_by']
        read_only_fields = ['uploaded_by']

class GalaxySerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True, read_only=True)
    class Meta:
        model=Galaxy
        fields = ['id', 'board', 'name', 'x_position', 'y_position', 'width', 'height', 'assets']

class BoardSerializer(serializers.ModelSerializer):
    galaxies = GalaxySerializer(many=True, read_only=True)
    class Meta:
        model = Board
        fields = ['id', 'company', 'board_type', 'name', 'galaxies']