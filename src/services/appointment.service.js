import api from './api';

class AppointmentService {
    getList() {
        return api.get('/appointments');
    }

    getListSearch(searchParam) {
        return api.get(`/animals?name=${searchParam}`);
    }

    getAnimalDetail(id) {
        return api.get(`/animals/${id}`);
    }

    postAnimal(data) {
        return api.post('/animals', {data});
    }

    putAnimal(data) {
        return api.put('/animals', {data});
    }

    deleteAnimal(id) {
        return api.delete(`/animals/${id}`);
    }
}

export default new AppointmentService();
