import api from './api';

class OwnerService {
    getList() {
        return api.get('/owners');
    }

    getListSearch(searchParam) {
        return api.get(`/owners?fullName=${searchParam}`);
    }

    getOwnerDetail(id) {
        return api.get(`/owners/${id}`);
    }

    postOwner(data) {
        data['fullName'] = `${data['firstName']} ${data['lastName']}`;
        console.log(JSON.stringify(data))
        return api.post('/owners', {data});
    }

    putOwner(data) {
        data['fullName'] = `${data['firstName']} ${data['lastName']}`;
        alert(JSON.stringify(data))
        return api.put('/owners', {data});
    }

    deleteOwner(id) {
        return api.delete(`/owners/${id}`);
    }
}

export default new OwnerService();
