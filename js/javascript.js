

consultarUsuarios(mostrarBotones, sinDatosUsuariosError);




/////////////////////////////////////////////////////////////////////////////////////

//-------DECLARACIÓN DE FUNCIONES------------------------------------------------------------------------------------------------------------




/**
 * muestra en pantalla botones correspondientes a la lista de usuarios
 * 
 * 
 * @param arr                 usuarios parseados (array)
 * 
 * 
 * 
 */

function mostrarBotones(arr) {

    let listaUsuarios = arr;

    // Se controla que exista la lista para recorrerla
    if (listaUsuarios != undefined) {
        // Se recorre la lista de usuarios
        for (var i = 0; i < listaUsuarios.length; i++) {
            // Para cada uno se agrega un botón en el div contenedor de botones
            agregarBoton(listaUsuarios[i].nombre, listaUsuarios[i].id)
        }

    } else {
        // Si no hay lista, se tira mensaje por consola para pruebas
        console.log("No hay usuarios definidos");

    }

}



/**
 * Recibe array original de lista de usuarios y devuelve uno nuevo con la estructura de objeto que necesitamos
 *
 * @param arrayLista           lista de usuarios (Array de objetos)
 *              
 */

function normalizarListaUsuarios(arrayLista) {

    nuevoArray = [];

    for (i = 0; i < arrayLista.length; i++) {

        nuevoArray.push({
            id: arrayLista[i].id,
            nombre: arrayLista[i].name
        });
    }
    return nuevoArray;
}


/**
 * Recibe array original de lista de posts según usuario y devuelve uno nuevo con la estructura de objeto que necesitamos
 *
 * @param arrayLista           lista de posts de usuario (Array de objetos)
 *              
 */

function normalizarListaPosts(arrayLista) {

    nuevoArray = [];

    for (i = 0; i < arrayLista.length; i++) {

        nuevoArray.push({
            id: arrayLista[i].id,
            titulo: arrayLista[i].title,
            contenido: arrayLista[i].body
        });
    }
    return nuevoArray;
}


/**
 * Recibe array original de lista de comentarios según posts y devuelve uno nuevo con la estructura de objeto que necesitamos
 *
 * @param arrayLista           lista de comentarios de posts (Array de objetos)
 *              
 */
function normalizarListaComentarios(arrayLista) {

    nuevoArray = [];

    for (i = 0; i < arrayLista.length; i++) {

        nuevoArray.push({
            idPost: arrayLista[i].postId,
            id: arrayLista[i].id,
            nombre: arrayLista[i].name,
            email: arrayLista[i].email,
            contenido: arrayLista[i].body

        });
    }
    return nuevoArray;
}





/**
 *  
 * avisa error de datos incompletos
 *   
 */

function sinDatosUsuariosError() {
    console.log("No se recibieron datos de usuarios")
}


/**
 *  
 * avisa error de datos incompletos
 *   
 */

function sinDatosPostsError() {
    console.log("No se recibieron datos de posts")
}

/**
 *  
 * avisa error de datos incompletos
 *   
 */

function sinDatosComentariosError() {
    console.log("No se recibieron datos de posts")
}






/**
 * Agrega un botón para acceder a los posts del usuario indicado
 *
 * @param nombre           Nombre del usuario (string)
 * @param id               id del usuario (number)
 *
 */
function agregarBoton(nombre, id) {

    // Se definen variables para guardar referencias a los divs contenedores que ya están creados
    var divContenedorBotonesUsuario = document.getElementById("div-contenedor-botones-usuario");
    var divContenedorListaPosts = document.getElementById("div-contenedor-lista-posts");

    // Se crea el elemento botón
    let boton = document.createElement("button");

    // Se le agrega una clase
    boton.setAttribute("class", "boton-usuario");

    // Se le asigna el texto
    boton.appendChild(document.createTextNode(nombre));

    // Se le asigna una función al evento click.
    boton.addEventListener("click", function () {
        consultarListaPostsUsuario(id, mostrarPostsUsuario, sinDatosPostsError);
    });

    // Agrega el botón creado al div recibido como contenedor
    divContenedorBotonesUsuario.appendChild(boton);
}





/**
 * Consulta y muestra los posts creados por el usuario indicado
 *
 * @param arr        array de posts correspondientes a un usuario (array)
 *
 */
function mostrarPostsUsuario(arr) {

    // Se definen variables para guardar referencias a los divs contenedores que ya están creados
    var divContenedorListaPosts = document.getElementById("div-contenedor-lista-posts");
    // Se vacía el div de posts por si hay elementos previos.
    divContenedorListaPosts.innerHTML = "";

    // Se crea variable para guardar el array de posts
    var listaPosts = arr;

    console.log(listaPosts);

    //se crea título para el apartado de posteos
    var tituloDivPosteos = document.createElement("h1");
    tituloDivPosteos.setAttribute("class", "titulo titulo-posts");
    tituloDivPosteos.appendChild(document.createTextNode("Artículos"));
    divContenedorListaPosts.appendChild(tituloDivPosteos);

    // Se recorre el array de posts y para cada uno se crea el elemento en pantalla
    for (let i = 0; i < listaPosts.length; i++) {

        //se crea el div de los posts
        let divPost = document.createElement("div");
        // se asigna clase    
        divPost.setAttribute("class", "post");


        //se asigna título 
        if (listaPosts[0].titulo != undefined && listaPosts[0].titulo != "") {

            let tituloPost = document.createElement("a");
            tituloPost.setAttribute("href", "#slider" + listaPosts[i].id);
            tituloPost.innerHTML = listaPosts[i].titulo;
            tituloPost.setAttribute("class", "titulo-post");
            tituloPost.style.textDecoration = "none";
            tituloPost.style.color = "inherit";
            divPost.appendChild(tituloPost);
        };

        // se asigna el contenido del post
        let textoPost = document.createElement("p");
        textoPost.className = "expandable texto-post";
        textoPost.setAttribute("id", "slider" + listaPosts[i].id);
        textoPost.innerHTML = listaPosts[i].contenido;

        // se asigna "botón" para abrir comentarios
        let botonComentarios = document.createElement("span");
        botonComentarios.innerHTML = "Ver Comentarios";
        botonComentarios.style.display = "block";
        botonComentarios.setAttribute("class", "boton-comentarios");
        botonComentarios.addEventListener("click", function () {
            console.log("prueba comentarios boton ", listaPosts[i].id);
            consultarComentariosPosts(listaPosts[i].id, mostrarComentarios, sinDatosComentariosError);
        });

        // se agregan los divs correspondientemente
        textoPost.appendChild(botonComentarios);
        divPost.appendChild(textoPost);
        divContenedorListaPosts.appendChild(divPost);
    }
}



/**
 * muestra comentarios referidos a los posteos de los autores
 * 
 * @param arr2           array de comentarios según post
 */

function mostrarComentarios(arr2) {

    console.log("testeo3: " + arr2);
    // variable auxiliar que recibe parse de los comentarios
    let listaComentarios = arr2;

    console.log(listaComentarios);


    // div a utilizar
    let divContenedorListaComentarios = document.getElementById("div-contenedor-lista-comentarios");
    // vacío contenido div
    divContenedorListaComentarios.innerHTML = "";
    //crea titulo de la sección
    var tituloDivComentarios = document.createElement("h1");
    tituloDivComentarios.setAttribute("class", "titulo titulo-comentarios");
    tituloDivComentarios.appendChild(document.createTextNode("Comentarios"));
    divContenedorListaComentarios.appendChild(tituloDivComentarios);

    // loop que crea html de todos los comentarios correspondientes al post
    for (let i = 0; i < listaComentarios.length; i++) {

        //se crean los divs de cada comentario
        let divComentario = document.createElement("div");
        divComentario.setAttribute("class", "comentarios-post");
        
        // se crea el contenido
        let textoComentario = document.createElement("p");
        textoComentario.setAttribute("class", "texto-comentario")
        
        let nombreUsuarioComentario = document.createElement("p");
        let emailUsuarioComentario = document.createElement("p");
        let contenidoComentario = document.createElement("p");

        nombreUsuarioComentario.innerHTML = `Nombre: ${listaComentarios[i].nombre}`
        emailUsuarioComentario.innerHTML = `Email: ${listaComentarios[i].email}`
        contenidoComentario.innerHTML = `Dijo: "${listaComentarios[i].contenido}"`

        textoComentario.appendChild(nombreUsuarioComentario);
        textoComentario.appendChild(emailUsuarioComentario);
        textoComentario.appendChild(contenidoComentario);
        
        // se appendea al div contenedor
        divComentario.appendChild(textoComentario);
        divContenedorListaComentarios.appendChild(divComentario);


    }

}