import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/book/';

class BookService {

    getBooks() {
        return axios.get(API_URL);
    }

    createBook(book, file) {
        let formData = new FormData();
        let user = JSON.parse(localStorage.getItem('user'));

        formData.append('image', file);
        formData.append('title', book.title);               
        formData.append('description', book.description);
        formData.append('quantity', book.quantity);
        return axios.post(API_URL, 
            formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": user.accessToken 
                }  
            }
        );
    }

    getBook(id) {
        return axios.get(API_URL + id);
    }

    deleteBook(id) {
        return axios.delete(API_URL + id,{ headers: authHeader() });
    }

    updateBook(book, id) {
        return axios.put(API_URL + id, book, { headers: authHeader() });
    }
}

export default new BookService();