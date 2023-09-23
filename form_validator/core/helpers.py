import os
import hashlib
from .models import Form

# type = 'original' or 'marked''
def save_upload_pdf(name, file, type_name = 'original')  :
    file_name = type_name + '_' + hashlib.md5(file.name.encode('utf-8')).hexdigest() + '.pdf'

    form = Form(
        PATH=file_name,
        NAME=name
    )
    form.save()

    form_id = form.ID

    folder_path = os.path.join('form_validator/media', 'pdf_uploads', str(form_id))

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file_path = os.path.join(folder_path, file_name)

    try:
        with open(file_path, 'wb') as destination:
            for chunk in file.chunks() :
                destination.write(chunk)
    except Exception as e:
        print(f"An error occurred while saving the file: str{e}")

    return file_path
