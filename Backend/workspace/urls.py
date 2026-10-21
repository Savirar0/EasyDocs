from django.urls import path
from . import views

urlpatterns = [
    path('board/<uuid:board_id>/', views.BoardView.as_view(), name='board-view')
]