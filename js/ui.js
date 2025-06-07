class UI {
    constructor() {
        // Encapsulate DOM element selections
        this.categorySelect = document.querySelector('#criptomoneda');
        this.animeSelect = document.querySelector('#moneda');
        this.searchTermInput = document.querySelector('#evento'); // Assuming 'evento' is the ID for search input
        this.form = document.querySelector('#formulario'); // Not directly used in UI methods yet, but good to have
        this.messagesContainer = document.querySelector('.mensajes');
        this.resultsContainer = document.getElementById('resultado');
        this.spinnerElement = document.querySelector('.contenido-spinner');

        this.init();
    }

    init() {
        this.populateCategorySelect();
    }

    // --- New Methods Delegated from app.js ---
    getSelectedCategory() {
        return this.categorySelect.value;
    }

    getSearchTerm() {
        return this.searchTermInput.value.trim();
    }

    getSelectedAnimeId() {
        return this.animeSelect.value;
    }

    clearSearchTermInput() {
        this.searchTermInput.value = '';
    }

    resetCategorySelect() {
        this.categorySelect.selectedIndex = 0; // Assumes the first option is the placeholder/default
    }

    clearAnimeSelect() {
        // Add a default placeholder option. Ensure this value is "" to match checks in app.js
        this.animeSelect.innerHTML = '<option value="">Choose your anime</option>';
    }

    clearMessages() {
        this.messagesContainer.innerHTML = '';
    }

    // --- Refined Existing Methods ---

    // Populates the category select dropdown
    populateCategorySelect() {
        // apiClient is globally defined in app.js
        // categories is the direct data array from API
        apiClient.getCategoriesAPI()
            .then(categories => {  // categories is now the direct array from apiClient
                this.categorySelect.innerHTML = '<option value="" disabled selected>Select Category</option>'; // Start with a placeholder
                if (categories && categories.length > 0) {
                    categories.forEach(category => {
                        const optionElement = document.createElement('option');
                        optionElement.value = category.attributes.slug;
                        optionElement.appendChild(document.createTextNode(category.attributes.title));
                        this.categorySelect.appendChild(optionElement);
                    });
                }
            })
            .catch(error => {
                console.error("Failed to populate categories:", error);
                this.mostrarMensaje('Could not load categories. Please refresh.', 'alert bg-danger text-center');
            });
    }

    // Populates the anime select dropdown based on selected category
    populateAnimeSelect(animes) { // animes is the direct data array
        this.clearAnimeSelect(); // Clear and set default placeholder

        if (animes && animes.length > 0) {
            animes.forEach(anime => {
                const optionElement = document.createElement('option');
                optionElement.value = anime.id;
                optionElement.appendChild(document.createTextNode(anime.attributes.canonicalTitle));
                this.animeSelect.appendChild(optionElement);
            });
        }
        // If animes is null, undefined, or empty, the select remains cleared with the default option.
    }

    // Displays a message to the user
    mostrarMensaje(message, cssClasses) {
        this.clearMessages(); // Clear previous messages

        const messageDiv = document.createElement('div');
        messageDiv.className = cssClasses; // Use provided classes
        messageDiv.appendChild(document.createTextNode(message));
        this.messagesContainer.appendChild(messageDiv);

        // Keep the timeout to auto-remove messages
        setTimeout(() => {
            // Check if the messageDiv is still a child of messagesContainer before trying to remove it
            if (messageDiv.parentNode === this.messagesContainer) {
                 this.messagesContainer.removeChild(messageDiv);
            }
        }, 3000);
    }

    // Prints the details of a selected anime
    mostrarResultado(animeAttributes) {
        // app.js now calls limpiarResultados() before this.

        const {
            synopsis,
            canonicalTitle: title, // Destructure and rename
            startDate,
            episodeCount,
            posterImage
        } = animeAttributes;

        const imageUrl = posterImage && posterImage.large ? posterImage.large : 'placeholder.jpg'; // Added check for posterImage itself

        const templateHTML = `
            <div class="card bg-warning col-md-8 offset-md-2">
                <div class="card-body text-light">
                    <h2 class="font-weight-bold text-center">${title}</h2>
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${imageUrl}" alt="${title} Poster" class="img-fluid mb-2" style="max-height: 300px;">
                        </div>
                        <div class="col-md-8">
                            <p><strong>Start Date:</strong> ${startDate || 'N/A'}</p>
                            <p><strong>Episodes:</strong> ${episodeCount || 'N/A'}</p>
                            <p><strong>Synopsis:</strong></p>
                            <p style="text-align: justify;">${synopsis || 'No synopsis available.'}</p>
                        </div>
                    </div>
                </div>
            </div>`;

        this.mostrarOcultarSpinner('block');
        // Reduced spinner display time for better perceived performance
        setTimeout(() => {
            this.resultsContainer.innerHTML = templateHTML;
            this.mostrarOcultarSpinner('none');
        }, 1000);
    }

    // Show or hide the loading spinner
    mostrarOcultarSpinner(displayState) {
        this.spinnerElement.style.display = displayState;
    }

    // Reads the API response and prints the results (list of animes)
    // searchResults is the direct data array
    mostrarEventos(searchResults) {
        // app.js calls limpiarResultados() before this method.

        if (!searchResults || searchResults.length === 0) {
            // This case should ideally be handled by app.js before calling mostrarEventos,
            // but as a fallback, ensure no error if searchResults is empty.
            // this.mostrarMensaje('No animes found matching your criteria.', 'alert alert-info text-center');
            this.resultsContainer.innerHTML = '<p class="text-center">No animes found.</p>'; // More direct feedback
            return;
        }

        let cardsHtml = ''; // Accumulates HTML for individual cards
        searchResults.forEach(animeItem => {
            const { // Destructuring from animeItem.attributes
                canonicalTitle: title,
                posterImage,
                synopsis,
                startDate,
                averageRating,
                status,
                episodeCount
            } = animeItem.attributes;

            const imageUrl = posterImage && posterImage.large ? posterImage.large : 'placeholder.jpg'; // Added check for posterImage

            cardsHtml += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card h-100">
                        <img class="card-img-top" src="${imageUrl}" alt="${title} Poster" style="max-height: 300px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-center">${title}</h5>
                            <p class="small"><strong>Start Date:</strong> ${startDate || 'N/A'}</p>
                            <p class="card-text small">${synopsis ? synopsis.substring(0, 100) : 'No synopsis available.'}...
                            </p>
                            <div class="mt-auto text-center"> <!-- Centered badges -->
                                <span class="badge badge-primary m-1">Rating: ${averageRating || 'N/A'}</span>
                                <span class="badge badge-secondary m-1">Status: ${status || 'N/A'}</span>
                                <span class="badge badge-info m-1">Episodes: ${episodeCount || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        // After the loop, wrap cardsHtml with a row
        this.resultsContainer.innerHTML = `<div class="row">${cardsHtml}</div>`;
    }

    // Clears previous results
    limpiarResultados() {
        this.resultsContainer.innerHTML = '';
    }
}