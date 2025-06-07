// Instantiate the API client and UI handler
// Initialize the API client.
// Note: The public Kitsu API endpoints used in this project (categories, anime search/details)
// do not require an API key. If an API key were required for other operations
// or a different API, managing it securely on the client-side would be a significant concern.
// For production applications, backend proxies are often used to protect API keys.
const apiClient = new API();
const uiHandler = new UI(); // Updated to new UI class name

// Event listener for category selection
// The initial querySelector for attaching the listener might remain until ui.js handles listener attachments
const categorySelectElement = document.querySelector('#criptomoneda');

categorySelectElement.addEventListener('change', async (event) => {
    // Get selected category slug via uiHandler (assuming uiHandler.getSelectedCategory() will be implemented)
    const selectedCategorySlug = uiHandler.getSelectedCategory();

    if (selectedCategorySlug === '' || selectedCategorySlug === null) {
        // If no category is selected (e.g., user selected the placeholder), clear the anime dropdown
        uiHandler.clearAnimeSelect(); // Assuming uiHandler.clearAnimeSelect() will be implemented
        return;
    }

    try {
        // API now returns data directly (e.g. an array of animes)
        const animesData = await apiClient.getAnimesByCategory(selectedCategorySlug);
        // Pass the direct data to populateAnimeSelect (formerly construirSelect2)
        uiHandler.populateAnimeSelect(animesData);
    } catch (error) {
        console.error('Error fetching animes by category:', error);
        uiHandler.mostrarMensaje('Failed to load animes for this category. Please try again.', 'alert bg-danger text-center');
        uiHandler.clearAnimeSelect(); // Clear anime select on error
    }
});

// Event listener for form submission
// The initial querySelector for attaching the listener might remain for now
const formElement = document.querySelector('#formulario');

formElement.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get search term and selected anime ID via uiHandler methods
    const searchTerm = uiHandler.getSearchTerm();
    const selectedAnimeId = uiHandler.getSelectedAnimeId();

    uiHandler.limpiarResultados(); // Clear previous results at the beginning

    try {
        if (searchTerm !== '' && searchTerm !== null) {
            // Search term is present, prioritize search
            const searchResults = await apiClient.searchAnimeByName(searchTerm); // API returns direct data array
            if (searchResults && searchResults.length > 0) {
                uiHandler.mostrarEventos(searchResults); // mostrarEventos expects the direct array
            } else {
                uiHandler.mostrarMensaje('No results found for your search.', 'alert alert-info text-center');
            }
            uiHandler.clearSearchTermInput(); // Clear the search input field
            // Also reset dependent dropdowns after a search
            uiHandler.resetCategorySelect();
            uiHandler.clearAnimeSelect();

        } else if (selectedAnimeId !== '' && selectedAnimeId !== null) {
            // No search term, but an anime ID is selected
            const animeData = await apiClient.getAnimeById(selectedAnimeId); // API returns direct data object for the anime
            if (animeData && animeData.attributes) { // Kitsu API typically nests details in attributes
                 uiHandler.mostrarResultado(animeData.attributes); // mostrarResultado expects attributes
            } else {
                 // This case might occur if animeData is null/undefined or lacks attributes
                 uiHandler.mostrarMensaje('Could not retrieve details for the selected anime.', 'alert alert-warning text-center');
            }
             // Also reset dependent dropdowns after selection
            uiHandler.resetCategorySelect();
            uiHandler.clearAnimeSelect();


        } else {
            // Neither search term nor selected anime ID is present
            uiHandler.mostrarMensaje('Please enter a search term or select an anime from the dropdowns.', 'alert bg-warning text-center');
            return; // No API call needed, exit early
        }
    } catch (error) {
        // Catch errors from API calls or other issues within the try block
        console.error('Error during form submission process:', error);
        uiHandler.mostrarMensaje('An error occurred while processing your request. Please try again.', 'alert bg-danger text-center');
        // Optionally, reset UI elements here as well if appropriate
        uiHandler.clearSearchTermInput();
        uiHandler.resetCategorySelect();
        uiHandler.clearAnimeSelect();
    }
});

// Removed all setTimeout calls for clearing fields.
// Removed direct DOM manipulations for getting values or clearing, now delegated to uiHandler.
// Removed console.log debugging messages.