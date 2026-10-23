from django.urls import path
from . import views

urlpatterns = [
    path('board/<uuid:pk>/', views.BoardView.as_view(), name='board-view'),
    
    path('board/galaxy/asset/', views.AssetView.as_view(), name='asset-view-post'),
    path('board/galaxy/asset/<uuid:pk>/', views.AssetView.as_view(), name='asset-view-patch'),

    path('board/galaxy/', views.GalaxyView.as_view(), name='galaxy-view-post'),
    path('board/galaxy/<uuid:pk>/', views.GalaxyView.as_view(), name='galaxy-view-patch'),
]