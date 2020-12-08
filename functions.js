//Variable usada para guardar el nombre de el usuario al que queremos
//mandar un mensaje
var userGlobal;
var currentUser;
var intervalConversation;
var intervalReadArray = [];
var intervalChats;
var newChat = 0;
var newChatUser = '';
var g = 0;
//variable para guardar los chats
var chatGlobal = [];
var groupglobal = [];
var groupglobal = '';

window.onload = function (){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                console.log("No hay sesion");
            } else {
                console.log(this.responseText);
                cargarPaginaPrincipal(this.responseText);
            }
        }
    }
    xhttp.open("POST", "check_session.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    return false;
}

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

function logout(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "FALSE") {
                location.reload();
            }    
        }
    }
    xhttp.open("POST", "logout_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    return false;
}

function sing_up() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Username already exists");
            } else {
                if (username === '' || password === '' || email === '')
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
    console.log(user);
    currentUser = user
    //Borrado de el form
    document.body.removeChild(document.getElementById("form"));
    if (document.getElementById("sing_up") != null)
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
    h3.addEventListener('click', perfilPersonal)
    chat.appendChild(h3);
    //boton para cambiar foto
    /*
    var foto = document.createElement('input');
    foto.setAttribute("type","file");
    foto.accept='image/*';
    foto.display='none';
    foto.id='foto_perf';
    foto.name='image';
    foto.onchange = function(event) {
        var fileList = foto.files;
        console.log(fileList[0].name)
     }
    chat.appendChild(foto);
    */
    //boton para agregar
    var agregar = document.createElement('button');
    agregar.addEventListener('click', addFriends);
    agregar.innerHTML = '<b> Add friends +</b>';
    chat.appendChild(agregar);
    //botón para la difusion
    var difusion = document.createElement('button');
    difusion.addEventListener('click', difusionList);
    difusion.innerHTML = '<b> Difusion Message +</b>'
    chat.appendChild(difusion);
    //boton log out
    var exit = document.createElement('button');
    exit.addEventListener('click', logout);
    exit.innerHTML = '<b> logout </b>'
    chat.appendChild(exit);
    //contenedor de la conversacion y la barra para escribir
    var contenedor_conver = document.createElement('div');
    contenedor_conver.id = "contenedor_conver_id";
    contenedor_conver.className = 'contenedor_conver';
    //contenedor para el titulo
    var divPerf = document.createElement('div');
    divPerf.style.width = '100%';
    divPerf.id = 'divPerf';
    divPerf.style.fontSize = '4em'
    divPerf.style.backgroundColor = '#b9ffb0';
    divPerf.style.height = '100px';
    divPerf.position = 'fixed';
    divPerf.style.top = '0';
    contenedor_conver.appendChild(divPerf);
    divPerf.addEventListener('click', cargarPerfil);
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
    //intervalChats = setInterval(cargarChats, 2500, user);
    cargarChats(user);
    //Peticion para los chats
}

//Petición para obtener los usuarios con los que se ha hablado
function cargarChats(user) {
    //console.log(user);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Something went wrong");
            } else {
                //alert('va bien');
                console.log(typeof(this.responseText));
                deleteChats();
                createChats(JSON.parse(this.responseText));
                cargarGrupos();
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
    chatGlobal = [];
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
        checkRead(chats[i]);
        //intervalReadArray.push(setInterval(checkRead, 2500, chats[i]));
    }
}

function cargarGrupos() {
    console.log(currentUser);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                console.log('NO HAY GRUPOS O FALLA')
            } else {
                console.log(JSON.parse(this.responseText));
                createGroups(JSON.parse(this.responseText));
            }
        }
    }
    var params = "currentUser=" + currentUser;
    xhttp.open("POST", "get_groups.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function createGroups(grupos) {
    gruposGlobal = [];
    gruposGlobal = grupos;
    //console.log(chatGlobal);
    for (var i = 0; i < grupos.length; i++) {
        var ele = document.createElement('div');
        ele.id = 'group_' + grupos[i];
        ele.style.textAlign = 'center';
        ele.addEventListener("click", onClick2)
        var p = document.createElement('p');
        p.innerHTML = grupos[i];
        p.style.margin = '10px';
        ele.appendChild(p);
        document.getElementById('chat_id').appendChild(ele);
        //Comprobar leidos y no leidos;
        //checkRead(grupos[i]);
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
    g = 0;
    clearInterval(intervalConversation);
    while (document.getElementById('conver_id').firstChild)
        document.getElementById('conver_id').removeChild(document.getElementById('conver_id').firstChild);
    var user = this.id.substring(5, this.id.length);
    userGlobal = user;
    updateRead(currentUser);
    //poner titulo de conver 
    document.getElementById('divPerf').innerHTML = '' + userGlobal;
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
                intervalConversation = setInterval(updateConver, 1500);
            }
        }
    }
    var params = "currentUser=" + currentUser + "&user=" + user;
    xhttp.open("POST", "load_chats_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function onClick2() {
    g = 1;
    clearInterval(intervalConversation);
    while (document.getElementById('conver_id').firstChild)
        document.getElementById('conver_id').removeChild(document.getElementById('conver_id').firstChild);
    var group = this.id.substring(6, this.id.length);
    groupglobal = group;
    //poner titulo de conver 
    document.getElementById('divPerf').innerHTML = '' + group;
    //Poner en negro si hay mensajes  leidos
    document.getElementById(this.id).style.color = '#FFFFFF';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                console.log("No funciona");
            } else {
                newChat = 0;
                newChatUser = 0;
                //metodo para sacar el div con los chats
                console.log(JSON.parse(this.responseText));
                cargarConversacion(JSON.parse(this.responseText));
                intervalConversation = setInterval(updateConverGroup, 1500);
            }
        }
    }
    var params = "group=" + group;
    xhttp.open("POST", "load_groups_json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function updateRead(currentUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                //alert("Actualizado");
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
    if (g === 1) {
        sendGroupMessage();
    } else {
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
}

function sendGroupMessage(){
    var msg = document.getElementById('input_msg').value;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!(msg == '')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText === "FALSE") {
                    alert("No manda mensaje");
                } else {
                    updateConverGroup();
                    document.getElementById('input_msg').value = "";
                }
            }
        }
        var params = "currentUser=" + currentUser + "&group=" + groupglobal + "&body=" + msg + "&time=" + date;
        xhttp.open("POST", "send_msg_group_json.php", true);
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

function updateConverGroup() {
    console.log('por aqui');
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
    var params = "group=" + groupglobal;
    xhttp.open("POST", "load_groups_json.php", true);
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
                //console.log('Por aqui');
                //clearInterval(intervalChats);
                //console.log(intervalReadArray);
                //for (var i = 0; i < intervalReadArray.length; i++)
                //clearInterval(intervalReadArray[i]);
                //intervalReadArray = [];
                //console.log(intervalReadArray);
                sendFirstMessage(username, currentUser);
                sendFirstMessage(currentUser, username);
                deleteChats();
                chatGlobal.push(username);
                //console.log(chatGlobal);
                newChat = 1;
                newChatUser = username;
                //intervalChats = setInterval(cargarChats, 1500, currentUser);
                cargarChats(currentUser);
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
    while (ele.children.length > 4)
        ele.removeChild(ele.lastChild);
}

function sendFirstMessage(user, currentUserNew) {
    var msg = 'asdfgh1234';
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!(msg == '')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText === "FALSE") {
                    console.log("SEND_FIRST_MESAGE: primer mensaje no enviado");
                } else {
                    console.log("SEND_FIRST_MESAGE: primer mensaje enviado");
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

//mostrar el perfil

function cargarPerfil() {
    clearInterval(intervalConversation);
    while (document.getElementById('conver_id').firstChild)
        document.getElementById('conver_id').removeChild(document.getElementById('conver_id').firstChild);


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("No existe este usuario");
            } else {
                //metodo para sacar el div con los chats
                mostrarPerfil(JSON.parse(this.responseText));
            }
        }
    }
    var params = "username=" + userGlobal;
    xhttp.open("POST", "get_profile.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}

function perfilPersonal() {
    clearInterval(intervalConversation);
    while (document.getElementById('conver_id').firstChild)
        document.getElementById('conver_id').removeChild(document.getElementById('conver_id').firstChild);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("No existe este usuario");
            } else {
                //metodo para sacar el div con los chats
                mostrarPerfilPersonal(JSON.parse(this.responseText));
            }
        }
    }
    var params = "username=" + currentUser;
    xhttp.open("POST", "get_profile.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;


}

function mostrarPerfil(user) {
    var p = document.createElement('p');
    p.innerHTML = 'Name: ' + user.name + '<br><br>Surname: ' + user.surname + '<br><br>Email: ' + user.email +
        '<br><br>address: ' + user.address + '<br><br>Username: ' + user.username + '<br><br>';
    var img = document.createElement('img');
    img.src = user.picture;
    img.setAttribute('url', user.picture);
    img.style.width = '100px';
    img.style.height = '100px';
    document.getElementById('conver_id').appendChild(img);
    document.getElementById('conver_id').appendChild(p);
}

function mostrarPerfilPersonal(user)
{
    
    document.getElementById('divPerf').innerHTML=''+user.username;

        var label=document.createElement('label');
        label.innerHTML='Name: ';
        var p = document.createElement('textarea');
        p.innerHTML = ''+user.name;
        p.id='name';
        p.className='textarea';

        var label1=document.createElement('label1');
        label1.innerHTML='Address: ';
        var p1 = document.createElement('textarea');
        p1.innerHTML = ''+user.address;
        p1.id='address';
        p1.className='textarea';

        var label2=document.createElement('label2');
        label2.innerHTML='Gmail: ';
        var p2 = document.createElement('textarea');
        p2.innerHTML = ''+user.email;
        p2.id='mail';
        p2.className='textarea';


        var updateBttn=document.createElement('button');
        updateBttn.addEventListener('click' , updateInfo);
        updateBttn.innerHTML='Update';

        //imagen
        var form=document.createElement('form');
        //form.action = 'upload_image.php';
        //form.addEventListener('submit' , cargarPaginaPrincipal(currentUser));
        form.id='formImg';
        form.method='post';
        form.enctype='multipart/form-data';
        var foto = document.createElement('input');
        foto.setAttribute("type","file");
        foto.name='myfile';
        foto.id='myfile';
        foto.accept='image/*';
        foto.style.float='left';
        
        
        
        var img = document.createElement('img');    
        img.src=user.picture;
        img.setAttribute('url',user.picture);
        img.style.width='100px';
        img.style.height='100px';
        img.style.float='left';
        document.getElementById('conver_id').appendChild(img);
        document.getElementById('conver_id').appendChild(label);
        document.getElementById('conver_id').appendChild(p);
        document.getElementById('conver_id').appendChild(label1);
        document.getElementById('conver_id').appendChild(p1);
        document.getElementById('conver_id').appendChild(label2);
        document.getElementById('conver_id').appendChild(p2);
        document.getElementById('conver_id').appendChild(updateBttn);
        document.getElementById('conver_id').appendChild(form);
        form.appendChild(foto);
        
           
        
}

function updateInfo()
{
    var name=document.getElementById('name').value;
    var address=document.getElementById('address').value;
    var mail=document.getElementById('mail').value;
    var foto=document.getElementById('myfile').value;
    console.log(foto)
    //document.getElementById('formImg').submit();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                
                mostrarPerfilPersonal(currentUser);
            } else {
                //metodo para sacar el div con los chats
                //mostrarPerfilPersonal(JSON.parse(this.responseText));
                alert('Invalid Username.');
            }
        }
    }
    var params = "name=" + name+ "&address=" + address + "&email=" + mail + '&user='+currentUser;
    xhttp.open("POST", "update_profile.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}



//boton para mostrar el sign_up

function mostrarForm() {
    var disp = document.getElementById("sing_up");
    disp.style.display = 'flex';
}

//Función para la lista de difusión;
function difusionList() {
    var n = window.prompt("how many people do you want to write?");
    var arrayUsers = [];
    for (var i = 0; i < n; i++) {
        arrayUsers.push(window.prompt('Destination user name'));
    }
    var msg = window.prompt('What do you want to tell?');
    console.log(arrayUsers);
    for (var i = 0; i < arrayUsers.length; i++) {
        sendDifList(arrayUsers[i], msg);
    }
}

function sendDifList(username, msg) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "FALSE") {
                alert("Message to " + username + "won't be send beacuse the user doesn't exists");
            } else {
                console.log('Por aqui');
                //clearInterval(intervalChats);
                //console.log(intervalReadArray);
                for (var i = 0; i < intervalReadArray.length; i++)
                    clearInterval(intervalReadArray[i]);
                intervalReadArray = [];
                //console.log(intervalReadArray);
                sendFirstMessage(username, currentUser);
                sendFirstMessage(currentUser, username);
                sendDifusionMsg(username, "***DIFUSSION MSG*** " + msg + " ***DIFUSSION MSG***");
                deleteChats();
                cargarChats(currentUser);
                //cargarChats(currentUser);
                //intervalChats = setInterval(cargarChats, 1500, currentUser);
            }
        }
    }
    var params = "user=" + username;
    xhttp.open("POST", "exist_user.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;
}

function sendDifusionMsg(username, msg) {
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!(msg == '')) {
        var xhttp = new XMLHttpRequest();
        var params = "currentUser=" + currentUser + "&user=" + username + "&body=" + msg + "&time=" + date;
        xhttp.open("POST", "send_msg_json.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        return false;
    } else {
        return false;
    }
}