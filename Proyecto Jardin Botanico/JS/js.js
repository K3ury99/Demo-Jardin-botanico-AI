// Claves y endpoints para acceder al servicio de predicción de Azure Custom Vision
const predictionKey = "d12a363ff9d041c5ae1b3d6f461767e3";
const endpointFile = "https://custovisioncjb-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b39f0dda-c15b-496b-949d-cdaa4b8f01d2/classify/iterations/Propuesta_Jardin_Botanico_3.0/image";
const endpointUrl = "https://custovisioncjb-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b39f0dda-c15b-496b-949d-cdaa4b8f01d2/classify/iterations/Propuesta_Jardin_Botanico_3.0/url";

// Manejador del evento de cambio en el input de subida de imágenes
$('#imageUpload').change(function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').attr('src', e.target.result); // Muestra una vista previa de la imagen
        }
        reader.readAsDataURL(file);
    }
});

// Manejador del evento de entrada en el input de URL de imágenes
$('#imageUrl').on('input', function() {
    const url = $(this).val();
    if (url) {
        $('#imagePreview').attr('src', url); // Muestra una vista previa de la imagen desde la URL
    } else {
        $('#imagePreview').attr('src', 'https://via.placeholder.com/400x300?text=Vista+previa+de+la+imagen'); // Muestra una imagen de marcador de posición si no hay URL
    }
});

// Función para analizar una imagen subida
function analyzeImage() {
    var file = document.getElementById("imageUpload").files[0];
    if (!file) {
        $("#results").html("<p>Por favor, selecciona una imagen primero.</p>");
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(function(blob) {
                $("#results").html("<p>Analizando imagen...</p>");
                // Realiza una solicitud AJAX para enviar la imagen al servicio de predicción
                $.ajax({
                    url: endpointFile,
                    beforeSend: function (xhrObj) {
                        xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                        xhrObj.setRequestHeader("Prediction-Key", predictionKey);
                    },
                    type: "POST",
                    data: blob,
                    processData: false
                })
                .done(function (data) {
                    displayResults(data); // Muestra los resultados de la predicción
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("Error details:", jqXHR.responseText);
                    $("#results").html("<p>Error: " + textStatus + "<br>Status: " + jqXHR.status + 
                                       "<br>Response Text: " + jqXHR.responseText +
                                       "<br>Error Thrown: " + errorThrown + "</p>");
                });
            }, 'image/jpeg');
        }
    };
    reader.readAsDataURL(file);
}

// Función para analizar una imagen desde una URL
function analyzeUrl() {
    var imageUrl = document.getElementById("imageUrl").value;
    if (!imageUrl) {
        $("#results").html("<p>Por favor, ingrese una URL de imagen válida.</p>");
        return;
    }

    $('#imagePreview').attr('src', imageUrl);

    $("#results").html("<p>Analizando imagen desde URL...</p>");
    // Realiza una solicitud AJAX para enviar la URL de la imagen al servicio de predicción
    $.ajax({
        url: endpointUrl,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Prediction-Key", predictionKey);
        },
        type: "POST",
        data: JSON.stringify({ "Url": imageUrl })
    })
    .done(function (data) {
        displayResults(data); // Muestra los resultados de la predicción
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error details:", jqXHR.responseText);
        $("#results").html("<p>Error: " + textStatus + "<br>Status: " + jqXHR.status + 
                           "<br>Response Text: " + jqXHR.responseText +
                           "<br>Error Thrown: " + errorThrown + "</p>");
    });
}

// Función para mostrar los resultados de la predicción
function displayResults(data) {
    var resultHtml = "<h2>Resultados:</h2>";
    if (data.predictions && data.predictions.length > 0) {
        data.predictions.sort((a, b) => b.probability - a.probability); // Ordena las predicciones por probabilidad
        var topPrediction = data.predictions[0];
        resultHtml += "<p>La flor en la imagen ha sido clasificada como: <strong>" + topPrediction.tagName + "</strong></p>";
        resultHtml += "<p>Probabilidad: " + (topPrediction.probability * 100).toFixed(2) + "%</p>";
        resultHtml += "<h3>Todas las predicciones:</h3>";
        resultHtml += "<ul>";
        data.predictions.forEach(prediction => {
            resultHtml += "<li>" + prediction.tagName + ": " + (prediction.probability * 100).toFixed(2) + "%</li>";
        });
        resultHtml += "</ul>";
    } else {
        resultHtml += "<p>No se pudo clasificar la flor.</p>";
    }
    $("#results").html(resultHtml);
}
