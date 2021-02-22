import https from 'https'
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/',
    hostname: process.env.REACT_APP_API_HOST || 'http://localhost:3000/',
    httpsAgent: https.Agent({
        rejectUnauthorized: false,
    }),
});

export const addBook = payload => api.post(`/admin/book/create`, payload)
export const getAllBooks = () => api.get(`/catalog/books`)
export const updateBookStock = (id, payload) => api.post(`/admin/book/${id}/updateStock`, payload)
export const updateBookAvailable = (id, payload) => api.post(`/admin/book/${id}/updateAvailable`, payload)
export const deleteBook = id => api.delete(`/admin/book/${id}/delete`)
export const borrowBook = id => api.post(`/catalog/book/${id}/borrow`)
export const returnBook = id => api.post(`/catalog/book/${id}/return`)
export const getBook = id => api.get(`/catalog/book/${id}`)

const apis = {
    addBook,
    getAllBooks,
    updateBookStock,
    updateBookAvailable,
    deleteBook,
    getBook,
    borrowBook,
    returnBook,
}

export default apis
