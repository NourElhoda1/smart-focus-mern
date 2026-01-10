import axios from 'axios';

export default axios.create({
    baseURL: '/v1', 
    headers: {
        'Content-Type': 'application/json'
    }
});