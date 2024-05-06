import MovieService from './services/movie.service.js';
import CategoryService from './services/category.service.js';

async function main() {
    const movieService = MovieService.getInstance();
    const categoryService = CategoryService.getInstance();

    await categoryService.find().then((categories) => {
        const selectElement = document.querySelector('.select');
        categories.genres.forEach((category) => {
            const optionElement = document.createElement('option');
            optionElement.value = category.id;
            optionElement.textContent = category.name;
            selectElement.appendChild(optionElement);
        });
    });


    await movieService.find().then((movies) => {
        const movieContainer = document.getElementById('movieContainer');
        movies.results.forEach((movie) => {
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

            const badge = document.createElement('div');
            badge.classList.add('badge', 'badge-secondary');
            badge.textContent = 'NEW';
            cardTitle.appendChild(badge);

            const description = document.createElement('p');
            description.textContent = movie.overview;

            const cardActions = document.createElement('div');
            cardActions.classList.add('card-actions', 'justify-end');

            movie.genre_ids.forEach((genreId) => {
                const genreBadge = document.createElement('div');
                genreBadge.classList.add('badge', 'badge-outline');
                genreBadge.textContent = getGenreName(genreId);
                cardActions.appendChild(genreBadge);
            });

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(description);
            cardBody.appendChild(cardActions);

            card.appendChild(figure);
            card.appendChild(cardBody);

            movieContainer.appendChild(card);
        });
    });
}

function getGenreName(genreId) {
    switch (genreId) {
        case 28:
            return 'Action';
        case 12:
            return 'Adventure';
        default:
            return 'Other';
    }
}

main();
