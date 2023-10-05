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
                viewMode: 0,
                zoom: 0
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

    $('#select-numbered-marks').on('change', function() {
        let quantityMark = $(this).val();
        $(".container-marks-inputs").html('<input type="text" class="form-control" id="mark' + quantityMark + '" placeholder="Marcador 1">');
        $(".container-marks-inputs").html('<img class="img img-fluid" src="/static/mark.png" alt="fffff" id="mark' + quantityMark + '" width="60px">');
    });

    var $move = false;
    var $selectedDiv = null;
    var $mouseX, $mouseY, $xp = 0, $yp = 0;

    // Função para mover imagens
    function moveImage($selectedDiv, e) {
        $mouseX = e.pageX - 15;
        $mouseY = e.pageY - 15;
        $xp += (($mouseX - $xp) / 12);
        $yp += (($mouseY - $yp) / 12);
        $selectedDiv.css({ left: $xp + 'px', top: $yp + 'px' });
    }

    $('.mark-image').click(function(e) {
        if (!$move) {
            $selectedDiv = $(this);
            $move = true;
        } else {
            $selectedDiv = null;
            $move = false;
        }
    });

    $(document).mousemove(function(e) {
        if ($move && $selectedDiv !== null) {
            moveImage($selectedDiv, e);
        }
    });

    $("#mark-width").focusout(function() {
        $(".mark-image").css("width", $(this).val() + "px");
    });

    $("#mark-height").focusout(function() {
        $(".mark-image").css("height", $(this).val() + "px");
    });

    // Gere uma nova imagem
    $("#btn-generate").click(function() {
        const containerMarksInputs = document.querySelector('.container-marks-inputs');
        const lastImage = containerMarksInputs.querySelector('img:last-child');

        if (lastImage) {
            const numImages = 1;
            const spacing = 20;

            for (let i = 0; i < numImages; i++) {
                const newImage = document.createElement('img');
                newImage.className = 'img img-fluid mark-image';
                newImage.src = lastImage.src;

                const referenceImageTop = lastImage.offsetTop;
                const referenceImageLeft = lastImage.offsetLeft;

                newImage.style.position = 'absolute';
                newImage.style.left = `${referenceImageLeft}px`;
                newImage.style.top = `${referenceImageTop + lastImage.height + spacing}px`;
                newImage.style.width = `${lastImage.width}px`;
                newImage.style.height = `${lastImage.height}px`;

                // Adicione a imagem ao contêiner
                $(".container-marks-inputs").append(newImage);

                // Adicione o evento de clique e movimento para a imagem gerada
                $(newImage).click(function(e) {
                    if (!$move) {
                        $selectedDiv = $(this);
                        $move = true;
                    } else {
                        $selectedDiv = null;
                        $move = false;
                    }
                });

                $(document).mousemove(function(e) {
                    if ($move && $selectedDiv !== null) {
                        moveImage($selectedDiv, e);
                    }
                });
            }
        }
    });
});
