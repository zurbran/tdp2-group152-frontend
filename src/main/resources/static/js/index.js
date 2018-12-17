var availabilityData;
var reservationData;

$('document').ready(function () {
    $("#navbar").load("navbar.html", function () {
        hideElementsAndLoadSession();
    });
});

function search(event) {
    event.preventDefault();
    $.ajax({
        url: "//" + window.location.hostname + ":9290/api/v1/availability?from=" + $('#origin').val() + "&to=" + $('#destination').val() + "&from_date=" + $('#tripdate').val(),
        type: 'GET',
        data: {},
        headers: {}
    }).done(function (data) {
        availabilityData = data;
        $('#journeyslist').empty();
        $('#stopslists').empty();
        var s = $("<select id=\"journeys\" onchange=\"showStops(event)\" name=\"journeys\" class=\"form-control\" size=\"" + (data.journeysDTO.length + 1) + "\"/>");
        $("<option />", {selected: "true", disabled: "disabled", value: data.journeysDTO.length++, text: "Seleccione un viaje "}).appendTo(s);
        data.journeysDTO.forEach(function (journey, i) {
            $("<option />", {value: i++, text: "Horario: " + journey.time}).appendTo(s);
        })
        $('#journeyslist').append(s);
    }).fail(function () {
        $('#feedback').show();
    });
}

function showStops(event) {
    event.preventDefault();
    var stopcel = $('#stops');
    if(!(stopcel === undefined))
    {
        $('#stops').remove();
    }
    stopsel = document.createElement('select');
    stopsel.id = "stops";
    stopsel.name = "stops";
    stopsel.classList.add("form-control");
    stopsel.size = availabilityData.journeysDTO[$('#journeys').val()].stops.length;
    var footer = document.createElement('option');
    footer.selected = "true";
    footer.disabled = "disabled";
    footer.value = stopsel.size++;
    footer.text = "Seleccione una parada";
    stopsel.appendChild(footer);
    availabilityData.journeysDTO[$('#journeys').val()].stops.forEach(function (stop) {
        var opt = document.createElement('option');
        opt.value = stop.stopId;
        opt.text = "Parada: " + stop.street + " Nro: " + stop.streetNumber;
        stopsel.appendChild(opt);
    });
    document.getElementById("stopslists").appendChild(stopsel);
}

function reservate(event) {
    event.preventDefault();
    uri = "//" + window.location.hostname + ":9290/api/v1/journey/" + availabilityData.journeysDTO[$('#journeys').val()].journeyId + "/stop/" + $('#stops').val() + "/"
    $.ajax({
        url: uri,
        type: 'POST',
        data: {},
        headers: {
            'passengerId': docCookies.getItem("__sessionId"),
            'authToken': docCookies.getItem("__authToken")
        }
    }).done(function (data) {
        reservationData = data;
        var win = window.open('//' + window.location.hostname + ":8080/ticket.html?ticket=" + reservationData.ticketId, '_blank');
        if (win) {
            win.focus();
        } else {
            alert('Habilite los pop ups');
        }

    }).fail(function () {
        window.alert("No se pudo reservar el pasaje!");
    });
}
