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
    //Borrado de el form
    document.body.removeChild(document.getElementById("form"));
    //contenedor principal
    var principal = document.createElement('div');
    principal.id = "contenedor-principal_id";
    principal.className = 'contenedor-principal';
    //Contenedor de los chats
    var chat = document.createElement('div');
    chat.id = "chat_id";
    chat.className = 'chat';
    //Titulo para los chats con el nombre de usuario
    var h3 = document.createElement('h3');
    h3.innerHTML = 'CHATS OF ' + user;
    chat.appendChild(h3);
    //contenedor de la conversacion y la barra para escribir
    var contenedor_conver = document.createElement('div');
    contenedor_conver.id = "contenedor_conver_id";
    contenedor_conver.className = 'contenedor_conver';
    //contenedor para la conversacion
    var conver = document.createElement('div');
    conver.id = 'conver_id'
    conver.className = 'conver';
    //Form para enviar mensajes
    var form = document.createElement('form');
    form.id = 'form_message';
    var input = document.createElement('input');
    var button = document.createElement('button');
    button.setAttribute('type','submit');
    //AÑADIR FUNCION DESPUES DE EL RETURN
    //button.setAttribute('onsubmit', 'return nombreFuncion()');
    button.innerHTML = 'send';
    //colgar en el dom
    form.appendChild(input);
    form.appendChild(button);
    contenedor_conver.appendChild(conver);
    contenedor_conver.appendChild(form);
    principal.appendChild(chat);
    principal.appendChild(contenedor_conver);
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
        ele.addEventListener("click",onClick)
        var p = document.createElement('p');
        p.innerHTML = chats[i];
        ele.appendChild(p);
        document.getElementById('chat_id').appendChild(ele);
    }
    
}


function onClick()    
{   
    var user=this.id;
    user.substring(5,user.length);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("No funciona");
            } else {
                alert("Mostrar Chat");
                //metodo para sacar el div con los chats
            }
        }
    }
    
    var currentUsu = document.getElementById("password").value;
    var params = "currentUser=" + currentUsu + "&user=" + user;
    xhttp.open("POST", "login_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}   
