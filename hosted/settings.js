"use strict";
var handleUpdate = function handleUpdate(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#username").val() == '' || $("#pass").val() == '') {
        handleError("All fields are required!");
        return false;
    };
    
    sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), redirect);
    return false;
};

var passwordUpdateWindow = function passwordUpdateWindow(props) {
    return React.createElement(
        
        "form",
        { id: "updateForm", name: "updateForm", onSubmit: handleUpdate, action: "/settings", method: "POST", className: "updateForm" },
        
        React.createElement(
            "h3",
            { htmlFor: 'title' },
            "Change Password"
        ),
        
        React.createElement(
            'label',
            { htmlFor: 'username' },
            'Username: '
        ),
        
        React.createElement('input', { id: 'username', type: 'text', name: 'username', placeholder: 'Username' }),
        
         React.createElement(
            'label',
            { htmlFor: 'pass'},
            'New Password: '
        ),
        
        React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'new Password' }),
   
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Update" })
);
};

var setup = function setup(csrf) {

    ReactDOM.render(React.createElement(updateWindow, { csrf: csrf }), document.querySelector("#passwordChange"));
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};