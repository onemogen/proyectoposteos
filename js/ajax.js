
/**
 * realiza pedido de información (lista de Posts/autores)
 *
 * @param cbFuncOK                   ejecuta el código (función)
 * @param cbFuncError                muestra un error  (función)
 *                 
 */

function consultarUsuarios(cbFuncOK, cbFuncError) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (this.readyState == 4) {
            if (this.status == 200) {

                //salva el parse del resultado de traer los datos en una var.
                let arrayUsuarios = JSON.parse(this.responseText);

                console.log("testeo: ", arrayUsuarios);

                //chequea que tenga información
                if (arrayUsuarios != undefined && arrayUsuarios.length > 0) {

                    //ejecuta código de dibuja la web
                    cbFuncOK(normalizarListaUsuarios(arrayUsuarios));
                } else {
                    cbFuncError();
                }
            }
        }
    }

    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.send();

}




/**
 * 
 * @param {idUsuario}    (número) id que identifica posts según autor
 * @param {cbFuncOK}     (función) función que realiza la ejecución del código del botón si se recibió información
 * @param {cbFuncError}  (función) función que avisa por consola si no recibió información 
 * 
 */

 function consultarListaPostsUsuario(idUsuario, cbFuncOK, cbFuncError) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (this.readyState == 4) {
            if (this.status == 200) {

                //salva el parse del resultado de traer los datos en una var.
                let arrayPosts = JSON.parse(this.responseText);

                console.log("testeo: ", arrayPosts);

                arrayPosts = normalizarListaPosts(arrayPosts);

                console.log("testeo 2: ", arrayPosts);

                

                //chequea que tenga información
                if (arrayPosts != undefined && arrayPosts.length > 0) {
                    

                    //ejecuta código de dibuja la web
                    cbFuncOK(arrayPosts);
                } else {
                    cbFuncError();
                }
            }
        }
    }

    request.open("GET", "https://jsonplaceholder.typicode.com/posts?userId="+ idUsuario);
    request.send();

}





/**
 * realiza pedido de información (lista de comentarios segun posts)
 * 
 * @param idPost                  id que comentarios según (número)
 * @param cbFuncOK                   ejecuta el código (función)
 * @param cbFuncError                muestra un error  (función)
 *                 
 */

function consultarComentariosPosts(idPost, cbFuncOK, cbFuncError) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (this.readyState == 4) {
            if (this.status == 200) {

                //salva el parse del resultado de traer los datos en una var.
                let arrayComentarios = JSON.parse(this.responseText);

                console.log("testeo coment1: ", arrayComentarios);

                arrayComentarios =  normalizarListaComentarios(arrayComentarios);

                console.log("testeo coment2", arrayComentarios);

                //chequea que tenga información
                if (arrayComentarios != undefined && arrayComentarios.length > 0) {

                    //ejecuta código de dibuja la web
                    cbFuncOK(arrayComentarios);
                } else {
                    cbFuncError();
                }
            }
        }
    }

    request.open("GET", "https://jsonplaceholder.typicode.com/comments?postId=" + idPost);
    request.send();

}

