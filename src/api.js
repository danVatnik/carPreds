import URLBuilder from './url-builder';

const baseAPI = '/api';

const CarsService = {

    getMakes(params){
        const url = URLBuilder.addQueryParams(`${baseAPI}/makes?`, params);
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
        });
    },

    getModels(params){
        const url = URLBuilder.addQueryParams(`${baseAPI}/models?`, params);
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
        });
    },

    getCars(params){
        const url = URLBuilder.addQueryParams(`${baseAPI}/cars?`, params);
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
        });
    },
}

export default CarsService;