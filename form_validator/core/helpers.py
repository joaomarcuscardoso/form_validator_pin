import os
import hashlib

from pdf2image.pdf2image import convert_from_path
from .models import Form

# type = 'original' or 'marked'
def save_upload_pdf(name, file, type_name = 'original')  :
    file_name = type_name + '_' + hashlib.md5(file.name.encode('utf-8')).hexdigest() + '.pdf'

    form = Form(
        pdf=file_name,
        name=name
    )
    form.save()

    form_id = form.id

    folder_path = os.path.join('media', 'pdf_uploads', str(form_id))

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file_path = os.path.join(folder_path, file_name)

    try:
        with open(file_path, 'wb') as destination:
            for chunk in file.chunks() :
                destination.write(chunk)
    except Exception as e:
        print(f"An error occurred while saving the file: str{e}")

    # convert pdf to image and save url
    try:
        images = convert_from_path(file_path)

        # Save the first image and update the Form model with the image URL
        if images:
            image_path = os.path.join(folder_path, 'page_1.jpg')  # Customize the image path
            images[0].save(image_path, 'JPEG')
            form.image = image_path  # Update the Form model with the image URL
            form.save()
    except Exception as e:
        print(f"An error occurred while converting PDF to images: {str(e)}")

    return form_id

