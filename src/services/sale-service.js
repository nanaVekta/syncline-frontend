import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/sale/';

class SaleService {

    createSale(sale) {
        return axios.post(API_URL, sale, { headers: authHeader() });
    }

    getUserSales(userId) {
        return axios.get(API_URL+ 'user/' + userId, { headers: authHeader() });
    }

    getAllSales() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}

export default new SaleService();