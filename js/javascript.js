// Se definen variables para guardar referencias a los divs contenedores que ya están creados
var divContenedorBotonesUsuario = document.getElementById("div-contenedor-botones-usuario");
var divContenedorListaPosts = document.getElementById("div-contenedor-lista-posts");

//---------------------------------------------------------------------------
// Se define array ("global") para la lista de usuarios
var listaUsuarios = [];

// Se consulta lista de usuarios y se guarda en el array
listaUsuarios = consultarListaUsuarios();
//----------------------------------------------------------------------------


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




/*
Hasta ahí llega el script que se ejecuta al cargar la página. Lo que sigue son definiciones de funciones.

Las funciones que se definen son:

- agregarBoton(nombre, id): Agrega un botón para acceder a los posts del usuario indicado

- verPostsUsuario(idUsuario): Consulta y muestra los posts creados por el usuario indicado

- consultarListaUsuarios(): Consulta y devuelve la lista de usuarios en un array

- consultarListaPostsUsuario(idUsuario): Consulta y devuelve la lista de posts para un usuario

*/


//--------------------------------------------------------------------------------------------------------------------------------------------


/**
 * Agrega un botón para acceder a los posts del usuario indicado
 *
 * @param nombre           Nombre del usuario (string)
 * @param id               id del usuario (number)
 *
 */
function agregarBoton(nombre, id) {

    // Se crea el elemento botón
	let boton = document.createElement("button");

    // Se le agrega una clase
    boton.setAttribute("class", "boton-usuario");

    /*

    setAttribute(<string atributo>, <string valor>) es una función que podemos usar para dar valor a atributos de los elementos del DOM.

    Por ejemplo:

    elemento.setAttribute("class", "........")    va a asignar al elemento el atributo class="......"
    elemento.setAttribute("id", "........")       va a asignar al elemento el atributo id="......"

    Podemos usarlo para otros atributos también, aunque por ahora no vimos más que esos.

    */

    // Se le asigna el texto
	boton.appendChild(document.createTextNode(nombre));

    // Se le asigna una función al evento click.
    boton.addEventListener("click", function() {
        verPostsUsuario(id);
    });

    /*

    Esto lo vimos muy por encima en la última clase. Vamos a analizarlo en la clase en cierta profundidad
    que tiene que ver con el scope de las variables, pero en principio podemos decir que lo que estamos
    haciendo es asignarle al evento "click" del objeto "boton" una función. Es decir, cuando se haga click
    en ese elemento, y se dispare el evento "click", se va a ejecutar esa función. En nuestro caso:

    function() {
        verPostsUsuario(id);
    }

    La función no tiene nombre, y eso en Javascript se puede hacer. Las funciones sin nombre se denominan
    "funciones anónimas" y las usamos en casos así donde estamos definiendo una función que no vamos a
    querer llamar desde ningún otro lado, así que ponerles nombre no nos aporta nada (también lo veremos más
    en detalle en clase).

    Recuerden que esta es una de las tres formas que vimos de asignar eventos:
    - Definirlos inline en el HTML (por ejemplo, <button onclick=".......">)
    - Definirlos usando la propiedad del elemento (del objeto que hace referencia al elemento, en realidad)
      asociada al evento (por ejemplo, boton.onclick = function(){ .... })
    - Usando la función nativa addEventListener (el caso que estamos usando en este ejemplo)

    */


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
        

        /*
            TODO:
            - Crear un div
            - Ponerle clase "post"
            - Agregarle como texto (textNode) el título del post que está "iterando" en el FOR
            - Colocar ("colgar") ese div nuevo en el divContenedorListaPosts

            Si tienen ganas y pueden, agreguen validaciones:
            - Que el título exista (que la propiedad "titulo" no sea undefined)
            - Que el título no esté vacío (que la propiedad "titulo" no sea igual a "")

            Si las agregan, prueben generar objetos sin propiedad "título" o con título vacío
            a ver cómo reacciona.

        */
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





//-----------------------------------------------------------------------------------------------------------------------------------------




/**
 * Consulta y devuelve la lista de usuarios en un array
 *
 * @return: Array de usuarios. Cada elemento es un objeto {id, nombre}
 *
 */
function consultarListaUsuarios() {

    /*
    TODO: generar el código para que la función cree y devuelva un array de usuarios, esto es un
    array (con datos a mano) de objetos con la estructura:
    {
        id: <number>,
        nombre: <string>
    }

    Pistas: no olviden DEVOLVER el objeto generado
    */

    return [
        {
            id: 1,
            nombre: "pablo"
        },
        {
            id: 2,
            nombre: "susana"
        }
    ]

}