class API {
     constructor() {
          // API key is not required for the public Kitsu endpoints used in this project.
          // If an API key were needed, it would be initialized here.
     }

     // get all categories
     async getCategoriesAPI() {
          const url = `https://kitsu.io/api/edge/categories`;
          try {
               const response = await fetch(url);
               if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText} (status: ${response.status})`);
               }
               const categoriesData = await response.json();
               return categoriesData.data; // Adjusted to return categoriesData.data
          } catch (error) {
               console.error('Failed to get categories:', error);
               throw error; // Re-throw to be handled by the caller
          }
     }

     // get animes by category slug
     async getAnimesByCategory(categorySlug) {
          const url = `https://kitsu.io/api/edge/anime?filter[categories]=${categorySlug}`;
          try {
               const response = await fetch(url);
               if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText} (status: ${response.status})`);
               }
               const animesData = await response.json();
               return animesData.data; // Adjusted to return animesData.data
          } catch (error) {
               console.error(`Failed to get animes for category ${categorySlug}:`, error);
               throw error; // Re-throw to be handled by the caller
          }
     }

     // get a specific anime by its ID
     async getAnimeById(animeId) {
          const url = `https://kitsu.io/api/edge/anime/${animeId}`;
          try {
               const response = await fetch(url);
               if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText} (status: ${response.status})`);
               }
               const animeData = await response.json();
               return animeData.data; // Adjusted to return animeData.data
          } catch (error) {
               console.error(`Failed to get anime by ID ${animeId}:`, error);
               throw error; // Re-throw to be handled by the caller
          }
     }

     // search for animes by name/text
     async searchAnimeByName(searchTerm) {
          const url = `https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}`;
          try {
               const response = await fetch(url);
               if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText} (status: ${response.status})`);
               }
               const searchResults = await response.json();
               return searchResults.data; // Adjusted to return searchResults.data
          } catch (error) {
               console.error(`Failed to search anime by name "${searchTerm}":`, error);
               throw error; // Re-throw to be handled by the caller
          }
     }
}
