import axios from 'axios';

export default axios.create({
    // L'URL de base est '/v1'
    // Grâce au proxy de Vite, cela redirige vers http://localhost:5000/v1
    baseURL: '/v1', 
    headers: {
        'Content-Type': 'application/json'
    }
});