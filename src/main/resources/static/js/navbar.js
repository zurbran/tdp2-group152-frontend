var signinObject = new Object();

function hideElementsAndLoadSession() {
    $('#feedback').hide();
    $('#user').hide();
    $('#logout').hide();
    if ($.cookie("__sessionId") && $.cookie("__sessionToken")) {
        $('#feedback').hide();
        $('#login-dropdown').toggle();
        $('#user').val($('#user').val() + $.cookie("email"));
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
        passengerId = data.passengerId;
        authToken = data.authToken;
        $.cookie('__sessionId', data.passengerId, { path: '/', domain: window.location.hostname });
        $.cookie('__authToken', data.authToken, { path: '/', domain: window.location.hostname });
        $.cookie('__email', data.email, { path: '/', domain: window.location.hostname });
        $('#feedback').hide();
        $('#login-dropdown').toggle();
        $('#user').val($('#user').val() + signinObject.email);
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
    $('#login-dropdown').toggle();
    if ($.cookie("__sessionId") && $.cookie("__sessionToken") && $.cookie("email")) {
        $.removeCookie("__sessionId");
        $.removeCookie("__sessionToken");
        $.removeCookie("email");
    }
    $('#logout').hide();
}