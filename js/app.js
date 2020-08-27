const cotizador = new API('API_AQUI');
const ui = new Interfaz();

// leer el formulario

const selectElement = document.querySelector('#criptomoneda');

selectElement.addEventListener('change', (event) => {
     
         // leer la criptomoneda seleccionada
     // leer la criptomoneda seleccionada
     const criptoMonedaSelect = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
     
     // comprobar que ambos campos tengan algo seleccionado
     if(criptoMonedaSeleccionada === '') {
          // arrojar una alerta de error
          ui.mostrarMensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');
     } else {
          // todo bien, consultar la api
          cotizador.obtenerCategoria(criptoMonedaSeleccionada) 
               .then(data => {
                    //console.log(data.resultado.data);
                    ui.construirSelect2(data.resultado.data);
               })
     }
     
     
});


const formulario = document.querySelector('#formulario');
// eventlistener
formulario.addEventListener('submit', (e) => {
     e.preventDefault();

      // Leer el texto del input buscar
      const textoBuscador = document.getElementById('evento').value;
      //console.log(textoBuscador)
 
      // Revisar que haya algo escrito en el buscador
      if(textoBuscador !== '') {
           // cuando si hay una busqueda
           cotizador.obtenerAnime(textoBuscador)
                .then(eventos => {
                    //console.log(eventos.resultado.data)
                     if(eventos.resultado.data.length > 0 ){
                          // Si hay eventos, mostrar el resultado                          
                          ui.limpiarResultados();
                          ui.mostrarEventos(eventos.resultado);
                          
                     } else {
                          // No hay eventos enviar una alerta
                          ui.mostrarMensaje('No hay resultados', 'alert alert-danger mt-4');
                     }
                })

                setTimeout(() => {

                    document.getElementById('evento').value = "";
               }, 3000);
      }
 

     // leer la criptomoneda seleccionada
     const criptoMonedaSelect = document.querySelector('#moneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
     //console.log(criptoMonedaSeleccionada)
     // comprobar que ambos campos tengan algo seleccionado
     if(criptoMonedaSeleccionada === ''&& textoBuscador == '') {
          // arrojar una alerta de error
          ui.mostrarMensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');
     } else {
          // todo bien, consultar la api
          cotizador.obtenerValores(criptoMonedaSeleccionada) 
               .then(data => {
                    //console.log(data.resultado.data.attributes);
                    ui.mostrarResultado(data.resultado.data.attributes);
               })
     }
     setTimeout(() => {
          document.getElementById('criptomoneda').selectedIndex = 0;
          document.getElementById('moneda').innerHTML = "";
          document.getElementById('evento').innerHTML = "";
     }, 3000);
     
})