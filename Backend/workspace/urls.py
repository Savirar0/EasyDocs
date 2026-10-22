from django.urls import path
from . import views

urlpatterns = [
    path('board/<uuid:board_id>/', views.BoardView.as_view(), name='board-view'),
    path('board/galaxy/asset/', views.AssetView.as_view(), name='asset-view-post'),
    path('board/galaxy/asset/<uuid:asset_id>/', views.AssetView.as_view(), name='asset-view-patch')
    
]