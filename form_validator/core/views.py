from django.db import models
from django.shortcuts import redirect, render
from django.http import HttpResponse

from .models import Form

from core.helpers import save_upload_pdf

# Create your views here.
def index(request):
    if (request.method == 'POST' and request.FILES['mark_file'] and request.POST.get('name')):
        name = request.POST.get('name')
        file = request.FILES['mark_file']
        form_id = save_upload_pdf(name, file, 'original')

        return redirect('/mark' + f'?id={form_id}')

    return render(request, 'core/index.html')

def mark(request):
    form_id = request.GET.get('id')

    form = None
    if (form_id) : 
        #  search in database form id and get file name
        form = Form.objects.get(id=form_id)


    return render(request, 'core/mark.html', {'form': form})
