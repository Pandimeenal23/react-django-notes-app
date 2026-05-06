from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.note_list),
    path('notes/<int:pk>/delete/', views.note_delete),
    path('notes/<int:pk>/update/', views.note_update),
]