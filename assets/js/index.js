import MovieService from './services/movie.service.js';
import GenreService from './services/genre.service.js';

async function main() {
    const selectElement = document.querySelector('.select');
    selectElement.addEventListener('change', fetchAndRenderMoviesByGenre);

    await fetchAndRenderMoviesByGenre();
}

async function fetchAndRenderMoviesByGenre() {
    const selectedGenreId = document.querySelector('.select').value;
    const movies = await MovieService.getInstance().findByGenre(selectedGenreId === 'all' ? null : selectedGenreId);
    const genres = await loadGenres();

    document.getElementById('movieContainer').innerHTML = '';

    movies.results.forEach((movie) => {
        document.getElementById('movieContainer').appendChild(createMovieCard(movie, genres));
    });
}

async function loadGenres() {
    const selectElement = document.querySelector('.select');
    if (selectElement.children.length > 1) {
        const genres = [];
        for (let i = 1; i < selectElement.children.length; i++) {
            const genre = {
                id: selectElement.children[i].value,
                name: selectElement.children[i].textContent,
            };
            genres.push(genre);
        }
        return genres;
    }
    const genres = await GenreService.getInstance().find();
    renderGenreOptions(genres.genres);
    return genres.genres;
}

function renderGenreOptions(genres) {
    const selectElement = document.querySelector('.select');

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Genres';
    selectElement.appendChild(allOption);

    genres.forEach(({ id, name }) => {
        const optionElement = document.createElement('option');
        optionElement.value = id;
        optionElement.textContent = name;
        selectElement.appendChild(optionElement);
    });
}

function createMovieCard(movie, genres) {
    const card = document.createElement('div');
    card.classList.add('card', 'w-96', 'bg-base-100', 'shadow-2xl', 'hover:shadow-2xl', 'hover:scale-105', 'transition-transform');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    img.alt = movie.title;
    figure.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = movie.title;

    if (isNewMovie(movie.release_date)) {
        const badge = document.createElement('div');
        badge.classList.add('badge', 'badge-secondary');
        badge.textContent = 'NEW';
        cardTitle.appendChild(badge);
    }

    const description = document.createElement('p');
    description.textContent = movie.overview;

    const cardActions = document.createElement('div');
    cardActions.classList.add('card-actions', 'justify-end');

    movie.genre_ids.forEach((genreId) => {
        const genreBadge = document.createElement('div');
        genreBadge.classList.add('badge', 'badge-outline');
        genreBadge.textContent = matchGenres(genreId, genres);
        cardActions.appendChild(genreBadge);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(description);
    cardBody.appendChild(cardActions);

    card.appendChild(figure);
    card.appendChild(cardBody);

    return card;
}

function isNewMovie(releaseDate) {
    const currentDate = new Date();
    const releaseDateObj = new Date(releaseDate);

    if (releaseDateObj > currentDate || currentDate - releaseDateObj < 2592000000)
        return true;
    else
        return false;
}

function matchGenres(genreId, genres) {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : 'Unknown Genre';
}

main();
