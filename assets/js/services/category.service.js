export default class CategoryService {
    baseUrl = 'https://api.themoviedb.org/3';
    apiToken = ''
    static instance;

    static getInstance() {
        CategoryService.instance ??= new CategoryService()
        return CategoryService.instance
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