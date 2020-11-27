//Variable usada para guardar el nombre de el usuario al que queremos
//mandar un mensaje
var userGlobal;
var currentUser;
var intervalConversation;
var intervalReadArray = [];
var intervalChats;
var newChat = 0;
var newChatUser = '';
//variable para guardar los chats
var chatGlobal = [];

//Petición para el loggin
function login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Check user and password");
            } else {
                currentUser = user;
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

function sing_up() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Username already exists");
            } else {
                if(username==='' || password==='')
                    alert('Fill Username & password');
                else
                    document.body.removeChild(document.getElementById("sing_up"));
                
            }
        }
    }
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password_signin").value;
    var params = "username=" + username + "&name=" + name + "&surname=" + surname +
        "&email=" + email + "&address=" + address + "&password=" + password;
    xhttp.open("POST", "sign_up_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

//Crea los elementos de la página principal
function cargarPaginaPrincipal(user) {
    //Borrado de el form
    document.body.removeChild(document.getElementById("form"));
    if(document.getElementById("sing_up") != null)
        document.body.removeChild(document.getElementById("sing_up"));
    document.body.removeChild(document.getElementById("boton"));
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
    //h3.style.margin='10px';
    h3.id = 'titulo_';
    h3.innerHTML = 'CHATS OF ' + user;
    chat.appendChild(h3);
    //boton para agregar
    var agregar = document.createElement('button');
    agregar.addEventListener('click', addFriends);
    agregar.innerHTML = '<b> Add friends +</b>'
    chat.appendChild(agregar);
    var difusion = document.createElement('button');
    difusion.addEventListener('click', difusionList);
    difusion.innerHTML = '<b> Difusion Message +</b>'
    chat.appendChild(difusion);
    //contenedor de la conversacion y la barra para escribir
    var contenedor_conver = document.createElement('div');
    contenedor_conver.id = "contenedor_conver_id";
    contenedor_conver.className = 'contenedor_conver';
    //contenedor para la conversacion
    var conver = document.createElement('div');
    conver.id = 'conver_id'
    conver.className = 'conver';
    //Form para enviar mensajes
    var form = document.createElement('div');
    form.id = 'form_message';
    var input = document.createElement('input');
    input.id = 'input_msg';
    var button = document.createElement('button');
    button.addEventListener('click', sendMessage);
    //colgar en el dom
    form.appendChild(input);
    form.appendChild(button);
    contenedor_conver.appendChild(conver);
    contenedor_conver.appendChild(form);
    principal.appendChild(chat);
    principal.appendChild(contenedor_conver);
    document.body.appendChild(principal);
    intervalChats = setInterval(cargarChats, 1500, user);
    //Peticion para los chats
}

//Petición para obtener los usuarios con los que se ha hablado
function cargarChats(user) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Something went wrong");
            } else {
                //alert('va bien');
                deleteChats();
                createChats(JSON.parse(this.responseText));
            }
        }
    }
    var params = "user=" + user;
    xhttp.open("POST", "get_chats.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

//Esta función carga la lista con los chats existentes
//recibe como parámetro los nombres de los chats;
function createChats(chats) {
    chatGlobal = chats;
    //console.log(chatGlobal);
    for (var i = 0; i < chats.length; i++) {
        var ele = document.createElement('div');
        ele.id = 'chat_' + chats[i];
        ele.style.textAlign = 'center';
        ele.addEventListener("click", onClick)
        var p = document.createElement('p');
        p.innerHTML = chats[i];
        p.style.margin = '10px';
        ele.appendChild(p);
        document.getElementById('chat_id').appendChild(ele);
        //Comprobar leidos y no leidos;
        //checkRead(chats[i]);
        intervalReadArray.push(setInterval(checkRead, 1500, chats[i]));
    }
    
}

//Función que comprueba los leidos
function checkRead(chat) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                document.getElementById('chat_' + chat).style.color = 'red';
            }
        }
    }
    var params = "currentUser=" + currentUser + "&user=" + chat;
    xhttp.open("POST", "chek_read.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

//Carga la conversación al hacer click en un chat
function onClick() {
    clearInterval(intervalConversation);
    var user = this.id.substring(5, this.id.length);
    userGlobal = user;
    updateRead(currentUser);
    //Poner en negro si hay mensajes  leidos
    document.getElementById(this.id).style.color = '#FFFFFF';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                //console.log("No funciona");
            } else {
                newChat = 0;
                newChatUser = 0;
                //metodo para sacar el div con los chats
                cargarConversacion(JSON.parse(this.responseText));
                intervalConversation = setInterval(updateConver, 1000);
            }
        }
    }
    var params = "currentUser=" + currentUser + "&user=" + user;
    xhttp.open("POST", "load_chats_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function updateRead(currentUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Actualizado");
            } else {
                alert("No actualizado");
            }
        }
    }
    var params = "currentUser=" + currentUser + "&user=" + userGlobal;
    xhttp.open("POST", "update_read.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}


//Recibe los mensajes por parámetro y los pone en el dom
function cargarConversacion(arrayMsg) {
    for (var i = 0; i < arrayMsg.length; i++) {
        var tmp = arrayMsg[i].time;
        arrayMsg[i].time = new Date(tmp);
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
        document.getElementById('conver_id').style.overflowX = 'hidden';
        var objDiv = document.getElementById("conver_id");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    //console.log(arrayMsg);
}


//Envía un mensaje cuando se hace click en el botón de enviar
function sendMessage() {
    var msg = document.getElementById('input_msg').value;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!(msg == '')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText === "FALSE") {
                    alert("No manda mensaje");
                } else {
                    updateConver();
                    document.getElementById('input_msg').value = "";
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


//Actualiza la conversacion. Se le llama cuando se envía un mensaje.
function updateConver() {
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
    var params = "currentUser=" + currentUser + "&user=" + userGlobal;
    xhttp.open("POST", "load_chats_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function addFriends() {
    var username = window.prompt("Friend Username");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("No existe el usuario");
            } else {
                console.log('Por aqui');
                clearInterval(intervalChats);
                //console.log(intervalReadArray);
                for(var i = 0; i < intervalReadArray.length; i++)
                    clearInterval(intervalReadArray[i]);
                intervalReadArray = [];
                //console.log(intervalReadArray);
                sendFirstMessage(username, currentUser);
                sendFirstMessage(currentUser,username);
                deleteChats();
                chatGlobal.push(username);
                console.log(chatGlobal);
                newChat = 1;
                newChatUser = username;
                intervalChats = setInterval(cargarChats, 1500, currentUser);
            }
        }
    }
    var params = "user=" + username;
    xhttp.open("POST", "exist_user.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}


function deleteChats() {
    var ele = document.getElementById('chat_id');
    while(ele.children.length > 3)
        ele.removeChild(ele.lastChild);
}

function sendFirstMessage(user, currentUserNew) {
    var msg = 'primer mensaje de ' + currentUserNew  + ' a ' + user;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!(msg == '')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText === "FALSE") {
                    console.log("primer mensaje no enviado");
                } else {
                    console.log("primer mensaje enviado");
                }
            }
        }
        var params = "currentUser=" + currentUserNew + "&user=" + user + "&body=" + msg + "&time=" + date;
        xhttp.open("POST", "send_msg_json.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        return false;
    } else {
        return false;
    }
}

//boton para mostrar el sign_up

function mostrarForm()
{
    
    var disp=document.getElementById("sing_up");
    disp.style.display='flex';
}