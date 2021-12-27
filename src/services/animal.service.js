import api from './api';

class AnimalService {
    getList() {
        return api.get('/owners');
    }

    getListSearch(searchParam) {
        return api.get(`/owners?fullName=${searchParam}`);
    }
}

export default new AnimalService();
