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
        $("#container-upload-file").toggle();
        $('.file-input').click();
    })

    $("#btn-send-file").click(function() {
        $("#file-form").submit();
    })
});
