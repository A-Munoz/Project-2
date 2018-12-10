const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '') {
        
        handleError("RAWR! All fields are required");
        return false;
        
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        
        loadDomosFromServer();
        
    });
    
    return false;
};

const handleRemoval = (e) => {
    e.preventDefault();
    $("#domoMessage").animate({width:'hide'}, 350);
    
    if($("#charName").val() == '') {
        handleError("Name is needed");
        return false
    }
    
console.log($("input[name=_csrf]").val());
    sendAjax('POST', $("#removeButton").attr("action"), $("#removeButton").serialize(), function() {
        loadDomosFromServer();
    });
}

const DomoForm = (props) => {
    return (
        
    <form id="domoForm"
            onSubmit={handleDomo} 
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="text" name="age" placeholder="Age"/>
        
         <label htmlFor="level">Level: </label>
        <input id="domolevel" type="text" name="level" placeholder="Level"/>
        
         <label htmlFor="class">Class: </label>
        <input id="domoClass" type="text" name="class" placeholder="Character Class"/>
        
         <label htmlFor="health">Health: </label>
        <input id="domoHealth" type="text" name="health" placeholder="30"/>
        
         <label htmlFor="str">Strength: </label>
        <input id="domoStr" type="text" name="str" placeholder="10"/>
        
         <label htmlFor="dex">Dexterity: </label>
        <input id="domoDex" type="text" name="dex" placeholder="10"/>
        
         <label htmlFor="int">Intellegence: </label>
        <input id="domoInt" type="text" name="int" placeholder="10"/>
        
         <label htmlFor="wis">Wisdom: </label>
        <input id="domoWis" type="text" name="wis" placeholder="10"/>
        
         <label htmlFor="con">Strength: </label>
        <input id="domoCon" type="text" name="con" placeholder="10"/>
        
    
        
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
    </form>
    
        
    );
};

const removalForm = (props) => {
    return (    
    <form id="removeButton"
            onSubmit={handleRemoval}
            name="removeButton"
            action="/delete"
            method="POST"
            className="removeButton"
        >  
         <label htmlFor="charName">Name: </label>
        <input id="charName" type="text" name="charName" placeholder="Character Name"/>
        
        <input type="hidden" name="_csrf" value={props.csrf}/>
       <input className="removeCharSubmit" type="submit" value="Delete"/>
    </form>
    
        
    );
};


const DomoList = function(props) {
    
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No characters yet</h3>
           
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        
        return (
        <div className="domoList">
            <div key={domo._id} className="domo">
                <img src={domo.img} alt="domo face" className="domoFace"/>
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoLevel">Level: {domo.level}</h3>
                <h3 className="domoClass">Class: {domo.class}</h3>
                <h3 className="domoHealth">Health: {domo.health}</h3>
                <h3 className="domoStr">Strength: {domo.str}</h3>
                <h3 className="domoDex">Dexterity: {domo.dex}</h3>
                <h3 className="domoWis">Wisdom: {domo.wis}</h3>
                <h3 className="domoInt">Intellegency: {domo.int}</h3>
                <h3 className="domoCon">Constitution: {domo.con}</h3>
            </div>
         </div>
        );
    });

    return (
        
        <div className="domoList">
            {domoNodes}
        </div>
    );
};


const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
}; 

const setup = function(csrf) {

    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
     ReactDOM.render(
        <removalForm csrf={csrf} />, document.querySelector("#removalChar")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => {
    
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});