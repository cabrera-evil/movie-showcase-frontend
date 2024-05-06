export default class GenreService {
    baseUrl = 'https://api.themoviedb.org/3';
    apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODAzMDVjOTVkOWMwOGFlNzM4NDI5YjM5ZmNmNmVjMSIsInN1YiI6IjY2Mzg3MmFjNjY1NjVhMDEyYzE2NWI3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EDovUFyYG9eWLue0KELCIjReQPCQh4F0X6Q3sQw3bFM'
    static instance;

    static getInstance() {
        GenreService.instance ??= new GenreService()
        return GenreService.instance
    }

    async find() {
        try {
            const options = {
                method: 'GET',
                url: `${this.baseUrl}/genre/movie/list`,
                params: { language: 'en' },
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