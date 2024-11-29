from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView
from gallery.models import Fotografia


class FotografiaListView(ListView):
    model = Fotografia


class FotografiaCreateView(CreateView):
    model = Fotografia
    fields = ["nome", "legenda", "descricao", "foto"]
    success_url = reverse_lazy("photo_list")


class FotografiaUpdateView(UpdateView):
    model = Fotografia
    fields = ["nome", "legenda", "descricao", "foto"]
    success_url = reverse_lazy("photo_list")


class FotografiaDeleteView(DeleteView):
    model = Fotografia
    success_url = reverse_lazy("photo_list")

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().post(request, *args, **kwargs)


from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Fotografia

def fotografia_detail(request, pk):
    """Retorna detalhes da fotografia no formato JSON."""
    fotografia = get_object_or_404(Fotografia, pk=pk)
    data = {
        "nome": fotografia.nome,
        "legenda": fotografia.legenda,
        "descricao": fotografia.descricao,
        "foto_url": fotografia.foto.url if fotografia.foto else "",
    }
    return JsonResponse(data)
