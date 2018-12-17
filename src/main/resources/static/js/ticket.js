var urlParams = new URLSearchParams(window.location.search);
var urlParam = urlParams.get('ticket');

function getInfo() {
    $.ajax({
        url: "//" + window.location.hostname + ":9290/api/v1//ticket/" + urlParam,
        type: 'GET',
        data: {},
        headers: {
           'passengerId': docCookies.getItem("__sessionId"),
           'authToken': docCookies.getItem("__authToken")
        }
    }).done(function (data) {
        $('#nombre').html('Usuario: '+data.user.name)
        $('#apellido').html('Usuario: '+data.user.lastName)
        $('#desde').html('Desde: '+data.journeyData.origin)
        $('#hacia').html('Hasta: '+data.journeyData.destiny)
        $('#calle').html('Parada: '+data.journeyData.address.street+' Nro '+data.journeyData.address.streetNumber)
        $('#fecha').html('Fecha: '+data.journeyData.date)
        $('#hora').html('Hora: ' +data.journeyData.time);
        $('#qrcodeCanvas').qrcode({
            text	: '{"tickedId":'+urlParam+'"journeyId":'+data.journeyData.id+'}'
        });
    }).fail(function () {
        $('#feedback').show();
    });
}