from django.urls import path

from gallery.views import (
    FotografiaListView,
    FotografiaCreateView,
    FotografiaUpdateView,
    FotografiaDeleteView,
    fotografia_detail
)

urlpatterns = [
    path("", FotografiaListView.as_view(), name="photo_list"),
    path("create", FotografiaCreateView.as_view(), name="photo_create"),
    path("update/<int:pk>", FotografiaUpdateView.as_view(), name="photo_update"),
    path("delete/<int:pk>", FotografiaDeleteView.as_view(), name="photo_delete"),
    path('fotografia/<int:pk>/', fotografia_detail, name='photo'),
]