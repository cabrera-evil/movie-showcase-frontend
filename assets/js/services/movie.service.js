export default class MovieService {
    baseUrl = 'https://api.themoviedb.org/3';
    apiToken = ''
    static instance;

    static getInstance() {
        MovieService.instance ??= new MovieService()
        return MovieService.instance
    }

    async find() {
        try {
            const options = {
                method: 'GET',
                url: `${this.baseUrl}/discover/movie`,
                params: {
                    include_adult: 'false',
                    include_video: 'false',
                    language: 'en-US',
                    page: '1',
                    sort_by: 'popularity.desc'
                },
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.apiToken}`
                }
            };

            return await axios
                .request(options)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }


    async findByCategory(category) {
        try {
            const options = {
                method: 'GET',
                url: `${this.baseUrl}/discover/movie`,
                params: {
                    with_genres: category,
                    include_adult: 'false',
                    include_video: 'false',
                    language: 'en-US',
                    page: '1',
                    sort_by: 'popularity.desc'
                },
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.apiToken}`
                }
            };

            return await axios
                .request(options)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }
}