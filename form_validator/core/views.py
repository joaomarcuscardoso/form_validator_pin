from django.shortcuts import redirect, render
from django.http import HttpResponse
import hashlib
import os

from core.helpers import save_upload_pdf

# Create your views here.
def index(request):
    if (request.method == 'POST' and request.FILES['mark_file']) :
        name = request.POST.get('name')
        file = request.FILES['mark_file']
        file_path = save_upload_pdf(name, file, 'original')

        return redirect('/mark' + f'?file={file_path}')

    return render(request, 'core/index.html')

def mark(request):
    file_path = request.GET.get('file')

    return render(request, 'core/mark.html')
