const handleUpdate = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width: 'hide'}, 350);
    
    if ($("#user").val() == '' || $("#oldPass").val() == '' || $("#pass1").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required!");
        return false;
    }
    sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), redirect);
    return false;
};
const passwordUpdateWindow = (props) => {
    return (
        <form id="updateForm"
        name="updateForm"
        onSubmit={handleUpdate}
        action="/settings" 
        method="POST" 
        className="pupdateForm"
        >
            <h3>Change Password</h3>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" name="username" placeholder="Username"/><br/>
            <label htmlFor="pass">New Password: </label>
            <input id="pass" type="password" name="pass1" placeholder="New Password"/><br/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <br/>
            <input className="passwordChangeSubmit" type="submit" value="Change password"/>
            <hr/>
        </form>
    );
};

const setup = (csrf) => {    
    ReactDOM.render(
        <PasswordChangeWindow csrf={csrf} />, document.querySelector("#settings")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});