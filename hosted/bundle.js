"use strict";

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == '' || $("#domoClass").val() == '')  {

        handleError("Name age and level are required");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {

        loadDomosFromServer();
    });

    return false;
};

var handleRemoval = function handleRemoval(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#charName").val() == '')  {

        handleError("Name is needed");
        return false;
    }

    console.log($("input[name=_csrf]").val());

     sendAjax('POST', $("#removeButton").attr("action"), $("#removeButton").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
};

var DomoForm = function DomoForm(props) {
    return React.createElement(
        "form",
        { id: "domoForm",
            onSubmit: handleDomo,
            name: "domoForm",
            action: "/maker",
            method: "POST",
            className: "domoForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Age" }),
        
         React.createElement(
            'label',
            { htmlFor: 'level' },
            'Level: '
        ),
        React.createElement('input', { id: 'domoLevel', type: 'text', name: 'level', placeholder: 'Character Level' }),
        
         React.createElement(
            'label',
            { htmlFor: 'class' },
            'Class: '
        ),
        React.createElement('input', { id: 'domoClass', type: 'text', name: 'class', placeholder: 'Character Class' }),
        
         React.createElement(
            'label',
            { htmlFor: 'health' },
            'Health: '
        ),
        React.createElement('input', { id: 'domoHealth', type: 'text', name: 'health', placeholder: '30' }),
        
         React.createElement(
            'label',
            { htmlFor: 'str' },
            'Str: '
        ),
        React.createElement('input', { id: 'domoStr', type: 'text', name: 'str', placeholder: '10' }),
        
         React.createElement(
            'label',
            { htmlFor: 'dex' },
            'Dex: '
        ),
        React.createElement('input', { id: 'domoDex', type: 'text', name: 'dex', placeholder: '10' }),
        
         React.createElement(
            'label',
            { htmlFor: 'int' },
            'Int: '
        ),
        React.createElement('input', { id: 'domoInt', type: 'text', name: 'Int', placeholder: '10' }),
        
         React.createElement(
            'label',
            { htmlFor: 'wis' },
            'Wis: '
        ),
        React.createElement('input', { id: 'dom', type: 'text', name: 'wis', placeholder: '10' }),
        
         React.createElement(
            'label',
            { htmlFor: 'con'},
            'Con: '
        ),
        React.createElement('input', { id: 'domoCon', type: 'text', name: 'con', placeholder: '10' }),
        

     
        
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Character" }),
        )
};

var removalForm = function removalForm(props) {
    return React.createElement(
        "form",
        { id: "removeButton",
            onSubmit: handleRemoval,
            name: "removeButton",
            action: "/delete",
            method: "POST",
            className: "removeButton"
        },
         React.createElement(
            'label',
            { htmlFor: 'charName'},
            'Name: '
        ),
        React.createElement('input', { id: 'charName', type: 'text', name: 'charName', placeholder: 'Character Name' }),
        
        
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Delete Character" }),
);
};

var DomoList = function DomoList(props) {

    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Characters"
            )
        );
    }

    var domoNodes = props.domos.map(function (domo) {

        return React.createElement(
            "div",
            { key: domo._id, className: "domo" },
            React.createElement("img", { src:"/assets/img/face.png", alt: "domo face", className: "domoFace" }),
            React.createElement(
                "h3",
                { className: "domoName" },
                "Name: ",
                domo.name
            ),
            React.createElement(
                "h3",
                { className: "domoAge" },
                "Age: ",
                domo.age
            ),
             React.createElement(
                "h3",
                { className: "domoLevel" },
                "Level: ",
                domo.level
            ),
            React.createElement(
                "h3",
                { className: "domoClass" },
                "Class: ",
                domo.class
            ),
            React.createElement(
                "h3",
                { className: "domoHealth" },
                "Health: ",
                domo.health
            ),
            React.createElement(
                "h3",
                { className: "domoStr" },
                "Str: ",
                domo.str
            ),
            React.createElement(
                "h3",
                { className: "domoDex" },
                "Dex: ",
                domo.dex
            ),
            React.createElement(
                "h3",
                { className: "domoInt" },
                "Int: ",
                domo.int
            ),
            React.createElement(
                "h3",
                { className: "domoWis" },
                "Wis: ",
                domo.wis
            ),
            React.createElement(
                "h3",
                { className: "domoCon" },
                "Con: ",
                domo.con
            ),
        );
    });

    return React.createElement(
        "div",
        { className: "domoList" },
        domoNodes
    );
};


var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getDomos', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    });
};

var setup = function setup(csrf) {

    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));
    
    ReactDOM.render(React.createElement(removalForm, { csrf: csrf }), document.querySelector("#removeChar"));

    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    loadDomosFromServer();
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
