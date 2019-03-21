var request = new XMLHttpRequest();



request.onreadystatechange = function() {

    if (this.readyState == 4) {

        if (this.status == 200) {

            //salva el parse del resultado de traer los datos en una var.

            let arrayUsuarios = JSON.parse(this.responseText);

            console.log(arrayUsuarios);

            //llama funcion que muestra usuarios en pantalla 

            mostrarBotones(consultarArrayUsuarios(arrayUsuarios));

        }

    }

}



request.open("GET", "https://jsonplaceholder.typicode.com/users");

request.send();






/**
 * Recibe array original de lista de usuarios y devuelve uno nuevo con la estructura de objeto que necesitamos
 *
 * @param arrayLista           lista de usuarios (Array de objetos)
 *              
 */

function consultarArrayUsuarios(arrayLista) {

    nuevoArray = [];

    for ( i = 0; i > arrayLista.length; i++) {

        nuevoArray.push({
            id: arrayLista[i].id,
            nombre: arrayLista[i].name
        });   
    }
    return nuevoArray;
}


//---------------------------------------------------------------------------


/**
 * carga botones de usuarios en la pantalla
 * 
 * @param array                 array de usuarios (array)
 */
 

function mostrarBotones(array) {

    let listaUsuarios = array;

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









//-------COMENTARIOS GENERALES-----------------------------------------------------------------------------------------------------------------


/*


Las funciones que se definen son:

(nueva) mostrarBotones( ): muestra los botones de usuarios en pantalla

- agregarBoton(nombre, id): Agrega un botón para acceder a los posts del usuario indicado

- verPostsUsuario(idUsuario): Consulta y muestra los posts creados por el usuario indicado

- (modif) consultaArrayUsuarios(): Recibe array original de lista de usuarios y devuelve uno nuevo con la estructura de objeto que necesitamos

- consultarListaPostsUsuario(idUsuario): Consulta y devuelve la lista de posts para un usuario

*/









//-------DECLARACIÓN DE FUNCIONES------------------------------------------------------------------------------------------------------------


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
    boton.addEventListener("click", function() {
        verPostsUsuario(id);
    });




    // Agrega el botón creado al div recibido como contenedor
    divContenedorBotonesUsuario.appendChild(boton);

}



//------------------------------------------------------------------------------------------------------------------------------------------------




/**
 * Consulta y muestra los posts creados por el usuario indicado
 *
 * @param idUsuario        id del usuario (number)
 *
 */
function verPostsUsuario(idUsuario) {

    // Se vacía el div de posts por si hay elementos previos.
    // Lo hacemos con innerHTML para no complicarnos ahora, pero no es la forma más apropiada
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




//----------------------------------------------------------------------------------------------------------------------------------------




/**
 * Consulta y devuelve la lista de posts para un usuario
 *
 * @param idUsuario: id del usuario a consultar
 *
 * @return: Array de posts para el usuario, en objetos {id, titulo, contenido}
 *
 */
function consultarListaPostsUsuario(idUsuario) {

    // Por ahora se devuelven datos de ejemplo, variables según el id consultado

    var respuesta = [];

    /*

    TODO: generar el código necesario para que según el idUsuario recibido devuelva resultados diferentes.
    En todos los casos, lo que hacemos es agregar objetos (definidos a mano) al array "respuesta"
    que después serán devueltos en la última línea (return respuesta). Cada objeto que agreguemos
    tendrá que tener la siguiente forma (expresado como propiedad: <tipo de dato>)
    {
        id: <number>,
        titulo: <string>,
        contenido: <string>
    }

    Pistas de una forma sencilla de hacerlo: recuerden "switch" y "push"

    */
        switch (idUsuario) {
            case 1: respuesta.push(
                { 
                    id: 1, 
                    titulo: "el corazón y las emociones", 
                    contenido: "blablablabla"
                },
                {
                    id: 1,
                    titulo: "el corazón y la ciencia",
                    contenido: "bloblobloblo"
                }
                );
            break;
            case 2: respuesta.push({ id: 2, titulo: "Filosofía hoy", contenido: "bleblebleble"}, {id: 2, titulo: "Filosofía en la antiguedad", contenido: "bliblibli"});
            break;
            default: console.log("No se han encontrado posts");
        }
    


    // Se muestra por consola para control en las pruebas
    console.log(respuesta);

    return respuesta;

}





