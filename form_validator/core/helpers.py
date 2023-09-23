import os
import hashlib

# type = 'original' or 'marked''
def save_upload_pdf(file, type_name = 'original')  :
    file_name = type_name + '_' + hashlib.md5(file.name.encode('utf-8')).hexdigest() + '.pdf'

    upload_dir = os.path.join('media', 'pdf_uploads')

    file_path = os.path.join(upload_dir, file_name)

    ### PROCESS the PDF file
    with open(file_path, 'wb') as destination:
        for chunk in file.chunks() :
            destination.write(chunk)

    return file_path
