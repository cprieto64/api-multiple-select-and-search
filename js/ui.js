class Interfaz {

     constructor() {
          this.init();
          // Leer el resultado
          this.listado = document.getElementById('resultado');
     }
     init() {
          this.construirSelect();
     }

     construirSelect() {
          cotizador.obtenerMonedasAPI()
               .then(monedas => {
                    //console.log(monedas.monedas.data);
                    // crear un select de opciones
                    const select = document.querySelector('#criptomoneda');
                    const animes = monedas.monedas.data;

                    // iterar por los resultados de la api
                    animes.forEach(element => {                  
                         //console.log(element.attributes.slug)
                         const opcion = document.createElement('option');                    
                         opcion.appendChild(document.createTextNode(element.attributes.title));
                         opcion.value = element.attributes.slug;
                         select.appendChild(opcion);
                     });

               })
     }
     
  
          construirSelect2(series) { 

                    //console.log(series)                   
                    // crear un select de opciones
                                       

                    const select = document.querySelector('#moneda');

                    if(select.value !== "Elige tu anime" ){                         
                         document.getElementById('moneda').innerHTML = "";

                    }                    
                    const animes = series;

                    // iterar por los resultados de la api
                    animes.forEach(element => {                  
                         //console.log(element.id)
                         const opcion = document.createElement('option');                    
                         opcion.appendChild(document.createTextNode(element.attributes.canonicalTitle));
                         opcion.value = element.id;
                         select.appendChild(opcion);
                         
                     });


               
     }


     mostrarMensaje(mensaje, clases) {
          const div = document.createElement('div');
          div.className = clases;
          div.appendChild(document.createTextNode(mensaje));

          // seleccionar mensajes
          const divMensaje = document.querySelector('.mensajes');
          divMensaje.appendChild(div);

          // mostrar contenido
          setTimeout(() => {
               document.querySelector('.mensajes div').remove();
          }, 3000);
     }

     // Imprime el resultado de la cotización

     mostrarResultado(resultado){

          // En caso de un resultado anterior, ocultarlo
          const resultadoAnterior = document.querySelector('#resultado > div');

          if(resultadoAnterior) {
               resultadoAnterior.remove();
          }

          const datosMoneda = resultado;

          //console.log(datosMoneda.posterImage.large);

          // recortar digitos de precio
          let sinosis = datosMoneda.synopsis,
               nombre = datosMoneda.canonicalTitle,
               startDate = datosMoneda.startDate,
               episodeCount = datosMoneda.episodeCount,
               img = datosMoneda.posterImage.large;


          // construir el template
          let templateHTML = `
               <div class="card bg-warning "col-md-4">
                    <div class="card-body text-light">
                         <h2 class="font-weight-bold">${nombre}</h2>
                         <img src="${img}" alt="" style="width: 200px; margin-bottom: 10px;">
                         
                         
                         
                         <p>Start date: ${startDate}</p>
                         <p>Number of episodes: ${episodeCount}</p>
                         <p><b>Synopsis</b></p>
                         <p style="width: 80%; text-align: center; margin: 0 auto;">${sinosis}</p>

                    </div>
               </div>
          `;

          this.mostrarOcultarSpinner('block');

         setTimeout(() => {
                // insertar el resultado
               document.querySelector('#resultado').innerHTML = templateHTML;

               // ocultar el spinner
               this.mostrarOcultarSpinner('none');
         }, 1500);
     }

     // Mostrar un spinner de carga al enviar la cotización
     mostrarOcultarSpinner(vista) {
          const spinner = document.querySelector('.contenido-spinner');
          spinner.style.display = vista;
     }

      // Lee la respuesta de la API e imprime los resultados
      mostrarEventos(eventos) {          
                  
          // leer los eventos y agregarlos a una variable
          const listaEventos = eventos.data;
               
          
          
          // recorrer los eventos y crear su template
          listaEventos.forEach(evento => {
               //console.log(evento)
               let title = evento.attributes.canonicalTitle,
                    img = evento.attributes.posterImage.large,
                    sinosis = evento.attributes.synopsis,
                    startDate = evento.attributes.startDate,
                    rating = evento.attributes.averageRating,
                    status = evento.attributes.status,
                    episodeCount = evento.attributes.episodeCount;
                    

               this.listado.innerHTML += `
                    <div class="col-md-4 mb-4" style="display: inline-block;">
                         <div class="card">
                              <img class="img-fluid mb-2" src="${img}"> 
                              <div class="card-body">
                                   <div class="card-text">
                                        <h2 class="text-center"></h2>
                                        <p class="Slead text-info">Anime Info</p>
                                        <h2>${title}</h2>
                                        <p class="small">Start date: ${startDate}<p>
                                        <p>${sinosis.substring(0,280)}...</p>
                                       

                                        <span class="badge badge-primary">Rating: ${rating} </span>
                                        <span class="badge badge-secondary">Status: ${status}</span>

                                        <!-- <a href="" target="_blank" class="btn btn-primary btn-block mt-4">Comprar Boletos</a>-->
                                   </div>
                              </div>

                         </div>
                    </div>
               `; 
               
                              
          })
          
     }
     
     // Limpia los resultados previos
     limpiarResultados() {
          this.listado.innerHTML = '';
     }
}