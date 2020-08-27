class API {
     constructor(apikey) {
          this.apikey = apikey;
     }
     // obtener todas las monedas
     async obtenerMonedasAPI() {
          const url = `https://kitsu.io/api/edge/categories`;

          // fetch a la api
          const urlObtenerMonedas = await fetch(url);

          // respuesta en json
          const monedas = await urlObtenerMonedas.json();
          
          return {
               monedas
          }
     }


     async obtenerCategoria(cat) {
          
          const url = `https://kitsu.io/api/edge/anime?filter[categories]=${cat}`;

          // consultar en rest api
          const urlConvertir = await fetch(url);

          const resultado = await urlConvertir.json(); 
          //console.log(resultado);
          
          return {
               resultado
          }
     }


     async obtenerValores(criptomoneda) {
          const url = `https://kitsu.io/api/edge/anime/${criptomoneda}`;

          // consultar en rest api
          const urlConvertir = await fetch(url);

          const resultado = await urlConvertir.json();

          return {
               resultado
          }
     }

     async obtenerAnime(criptomoneda) {
          const url = `https://kitsu.io/api/edge/anime?filter[text]=${criptomoneda}`;

          // consultar en rest api
          const urlConvertir = await fetch(url);

          const resultado = await urlConvertir.json();

          return {
               resultado
          }
     }
}


