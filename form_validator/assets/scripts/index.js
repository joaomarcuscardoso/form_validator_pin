import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import '../styles/index.css'

$(document).ready(function() {
    $(".btn-step").click(function() {
        var step = $(this).data('step'); // get button clicked

        window.alert('Step: ' + step);
        if (step == 1) {
            // Render route home
        } else if (step == 2) {
            // Render  route mark
        } else if (step == 3) {
            // Render send form
        } else if (step == 4) {
            // Render route success (informe o caminho do csv de envio)
        }

    });

    $("#btn-show-upload").click(function() {
        $("#container-upload-file").show();
        $('.file-input').click();
        $(this).hide();
    })

    $("#btn-send-file").click(function() {
        $("#file-form").submit();
    })

    let cropper = null;
    $("#btn-show-crop").click(function() {
        $("#croup-container").show();

        const image = document.getElementById("mark-original")
        if (image) {
            cropper = new Cropper(image, {
                aspectRatio: 0,
                viewMode: 0
            })
            $('#mark-dist').hide();

        }
    })

    $("#btn-crop").click(function() {
        $("#croup-container").hide();

        if (cropper) {
            let croppedImage = cropper.getCroppedCanvas().toDataURL("image/jpg");
            document.getElementById("mark-dist").src = croppedImage;
        }

        $('#mark-dist').show();
    });
});
