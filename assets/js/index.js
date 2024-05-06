import MovieService from './services/movie.service.js';

function main(){
    const movieRepository = MovieService.getInstance();
    movieRepository.find().then((movies) => {
        console.log(movies);
    });
}

main();