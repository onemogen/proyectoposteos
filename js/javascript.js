

consultarUsuarios(mostrarBotones, sinDatosUsuariosError);




/////////////////////////////////////////////////////////////////////////////////////



//-------COMENTARIOS GENERALES-----------------------------------------------------------------------------------------------------------------


/*


Las funciones que se definen son:

- (nueva) normalizarListaUsuarios(arrayLista): Recibe array original de lista de usuarios y devuelve uno nuevo con la estructura de objeto que necesitamos

- (nueva) mostrarBotones(arr, cbFunc): recibe un array de usuarios y agrega botones correspondientes

- (nueva) consultarUsuarios(cbFuncOK, cbFuncError): realiza pedido de información (lista de usuarios/autores)

- agregarBoton(nombre, id): Agrega un botón para acceder a los posts del usuario indicado


- (nueva) sinDatosError (): avisa sobre falta de datos, en consola

- verPostsUsuario(idUsuario): Consulta y muestra los posts creados por el usuario indicado

- consultarListaPostsUsuario(idUsuario): Consulta y devuelve la lista de posts para un usuario

*/









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

    // Se recorre el array de posts y para cada uno se crea el elemento en pantalla
    for (var i = 0; i < listaPosts.length; i++) {

        //se crea el div de los posts
        let divPost = document.createElement("div");
        // se asigna clase    
        divPost.setAttribute("class", "post");

        //se asigna título 
        if (listaPosts[0].titulo != undefined && listaPosts[0].titulo != "") {
            divPost.appendChild(document.createTextNode(listaPosts[i].titulo));
        };

        // se asigna el contenido del post
        let textoPost = document.createElement("p");
        textoPost.setAttribute("class", "post");
        textoPost.innerHTML = listaPosts[i].contenido;
        divPost.appendChild(textoPost);


        // se agrega el div del post al div contenedor
        divContenedorListaPosts.appendChild(divPost);
    }

}


//----------------------------------------------------------------------------------------------------------------------------------------

/*

/**
 * Consulta y muestra los posts creados por el usuario indicado
 *
 * @param idUsuario        id del usuario (number)
 *
 */
function verPostsUsuario(idUsuario) {

    // Se definen variables para guardar referencias a los divs contenedores que ya están creados
    var divContenedorBotonesUsuario = document.getElementById("div-contenedor-botones-usuario");
    var divContenedorListaPosts = document.getElementById("div-contenedor-lista-posts");

    // Se vacía el div de posts por si hay elementos previos.
    divContenedorListaPosts.innerHTML = "";

    // Se crea variable para guardar el array de posts, se llena con la función de consulta
    var listaPosts = consultarListaPostsUsuario(idUsuario);

    // Se recorre el array de posts y para cada uno se crea el elemento en pantalla
    for (var i = 0; i < listaPosts.length; i++) {

        //se crea el div de los posts
        let divPost = document.createElement("div");
        // se asigna clase    
        divPost.setAttribute("class", "post");

        //se asigna título 
        if (listaPosts[0].titulo != undefined && listaPosts[0].titulo != "") {
            divPost.appendChild(document.createTextNode(listaPosts[i].titulo));
        };

        // se asigna el contenido del post
        let textoPost = document.createElement("p");
        textoPost.setAttribute("class", "post");
        textoPost.innerHTML = listaPosts[i].contenido;
        divPost.appendChild(textoPost);
        
        // se agrega el div del post al div contenedor
        divContenedorListaPosts.appendChild(divPost);
    }

}
