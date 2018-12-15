var signinObject = new Object();

function hideElementsAndLoadSession() {
    $('#feedback').hide();
    $('#user').hide();
    $('#logout').hide();
    if (docCookies.hasItem("__sessionId")&&docCookies.hasItem("__authToken")) {
        $('#feedback').hide();
        $('#login-dropdown').toggle();
        $('#user').text('Sesion iniciada, usuario: ' + docCookies.getItem("__email"));
        document.getElementById("user").style.color = "#fff";
        $('#user').show();
        $('#logout').show();
    }
};

function login(event) {
    event.preventDefault();
    signinObject.email = $('#email').val();
    signinObject.password = $('#pass').val();
    $.ajax({
        url: "//" + window.location.hostname + ":9290/api/v1/signin",
        type: 'POST',
        data: {},
        headers: {
            'email': signinObject.email,
            'password': signinObject.password
        }
    }).done(function (data) {
        docCookies.setItem('__sessionId', data.passengerId, Infinity,'/');
        docCookies.setItem('__authToken', data.authToken, Infinity, '/');
        docCookies.setItem('__email', data.email, Infinity, '/');
        $('#feedback').hide();
        $('#login-dropdown').hide();
        $('#user').text('Sesion iniciada, usuario: ' + signinObject.email);
        document.getElementById("user").style.color = "#fff";
        $('#user').show();
        $('#logout').show();
        $('#logform').toggle();
    }).fail(function () {
        $('#feedback').show();
    });
}

function logout(event) {
    $.remove
    event.preventDefault();
    $('#user').hide();
    $('#user').val("Sesion iniciada, usuario:");
    $('#login-dropdown').show();
    $('#logform').show();
    if (docCookies.hasItem("__sessionId") && docCookies.hasItem("__authToken") && docCookies.hasItem("__email")) {
        docCookies.removeItem("__sessionId",'/');
        docCookies.removeItem("__authToken",'/');
        docCookies.removeItem("__email",'/');
    }
    $('#logout').hide();
}