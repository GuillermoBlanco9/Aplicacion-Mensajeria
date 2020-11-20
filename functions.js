function login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Check user and password");
            } else {
                alert("Login correct");
                cargarPaginaPrincipal(user);
            }
        }
    }
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var params = "user=" + user + "&password=" + password;
    xhttp.open("POST", "login_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function cargarPaginaPrincipal(user) {
    //Estructura de la página 
    document.body.removeChild(document.getElementById("form"));
    var principal = document.createElement('div');
    principal.id = "contenedor-principal";
    var chat = document.createElement('div');
    chat.id = "chat";
    chat.style.border = '1px solid #000000';
    chat.style.float = 'left';
    var h3 = document.createElement('h3');
    h3.innerHTML = 'CHATS OF ' + user;
    chat.appendChild(h3);
    var conver = document.createElement('div');
    conver.id = "conver";
    conver.style.border = '1px solid #000000';
    chat.style.float = 'left';
    principal.appendChild(chat);
    principal.appendChild(conver);
    document.body.appendChild(principal);

    cargarChats(user);
    //Peticion para los chats

}

function cargarChats(user) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Something went wrong");
            } else {
                //alert('va bien');
                createChats(JSON.parse(this.responseText));
            }
        }
    }
    var params = "user=" + user;
    xhttp.open("POST", "get_chats.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

function createChats(chats){
    console.log(chats);
    for(var i = 0; i < chats.length; i++){
        var ele = document.createElement('div');
        ele.id = 'chat_' + chats[i];
        ele.style.textAlign='center';
        var p = document.createElement('p');
        p.innerHTML = chats[i];
        ele.appendChild(p);
        document.getElementById('chat').appendChild(ele);
    }
    
}