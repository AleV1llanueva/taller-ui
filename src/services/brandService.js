import { API_BASE_URL, handleResponse } from "./api.js";

export const brandService = {
    getAll: async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/brands`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al obtener las marcas:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al obtener la amrca:', error);
            throw error;
        }
    },

    create: async (brand) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/brands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: brand.description,
                    active: brand.active ?? true
                })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al crear marca:', error);
            throw error;
        }
    },

    update: async (id, brand) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: brand.description,
                    active: brand.active
                })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al actualizar la marca:', error);
            throw error;
        }
    },

    deactivate: async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al desactivar la marca:', error);
            throw error;
        }
    }
};