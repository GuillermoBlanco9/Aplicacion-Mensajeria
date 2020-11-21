var userGlobal;

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
    h3.id = 'titulo_';
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
    var form=document.createElement('div');
    form.id='form_message';
   
    var input = document.createElement('input');
    input.id = 'input_msg';
    var button = document.createElement('button');
    button.addEventListener('click',sendMessage);
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

function createChats(chats) {
    //console.log(chats);
    for (var i = 0; i < chats.length; i++) {
        var ele = document.createElement('div');
        ele.id = 'chat_' + chats[i];
        ele.style.textAlign = 'center';
        ele.addEventListener("click", onClick)
        var p = document.createElement('p');
        p.innerHTML = chats[i];
        ele.appendChild(p);
        document.getElementById('chat_id').appendChild(ele);
    }

}


function onClick() {
    var user = this.id.substring(5, this.id.length);
    userGlobal=user;
    var tituloInnerHTML = document.getElementById("titulo_").innerHTML;
    var currentUser = tituloInnerHTML.substring(9, tituloInnerHTML.length);
    console.log(currentUser);
    console.log(user);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("No funciona");
            } else {
                
                //metodo para sacar el div con los chats
                cargarConversacion(JSON.parse(this.responseText));
            }
        }
    }


    var params = "currentUser=" + currentUser + "&user=" + user;
    xhttp.open("POST", "load_chats_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function cargarConversacion(arrayMsg) {
    //console.log(arrayMsg);
    //en este for se pasa el tiempo de los mensajes a formato date y luego se ordenan
    for (var i = 0; i < arrayMsg.length; i++) {
        //arrayMsg[i].time = new Date()
        var tmp = arrayMsg[i].time;
        /*/tmp = new Date(tmp.substring(0.4, tmp.substring(5,7), tmp.substring(8,10),
                        tmp.substring(11,13),
                        tmp.substring(14,16),
                        tmp.substring(17,19)));*/
        arrayMsg[i].time = new Date(tmp);
        //console.log(arrayMsg[i].time);
    }
    arrayMsg.sort(function (a, b) {
        return a.time - b.time;
    });
    while (document.getElementById('conver_id').firstChild)
        document.getElementById('conver_id').removeChild(document.getElementById('conver_id').firstChild);
    for (var i = 0; i < arrayMsg.length; i++) {
        var p = document.createElement('p');
        p.innerHTML = arrayMsg[i].origin_user_id + ' dijo:<br> ' + arrayMsg[i].body +
            '<br>Time: ' + arrayMsg[i].time + '<br><br>';
        document.getElementById('conver_id').appendChild(p);
        document.getElementById('conver_id').style.overflow = 'scroll';
    }
    console.log(arrayMsg);
}

function sendMessage() {
    var msg = document.getElementById('input_msg').value;
    var tituloInnerHTML = document.getElementById('titulo_').innerHTML;
    var currentUser = tituloInnerHTML.substring(9, tituloInnerHTML.length);
    var date=new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(date);
    /*console.log(time);
    console.log(msg);
    console.log(currentUser);*/
    if (!(msg=='')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText === "FALSE") {
                    alert("No manda mensaje");
                } else {
                    alert("Mensaje enviado");
                }
            }
        }
        var params = "currentUser=" + currentUser + "&user=" + userGlobal + "&body=" + msg + "&time=" + date;
        xhttp.open("POST", "send_msg_json.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        return false;
    } else {
        return false;
    }
}