import { API_BASE_URL, handleResponse } from "./api.js";

export const motorcycleService = {
    getAll: async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/motorcycles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al obtener Motocicletas:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/motorcycles/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al obtener catálogo:', error);
            throw error;
        }
    },

    create: async (motorcycle) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/motorcycles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_marca: motorcycle.id_marca,
                    name: motorcycle.name,
                    active: motorcycle.active ?? true
                })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al crear la motocicleta:', error);
            throw error;
        }
    },

    update: async (id, motorcycle) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/motorcycles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_marca: motorcycle.id_marca,
                    name: motorcycle.name,
                    active: motorcycle.active ?? true
                })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al actualizar la motocicleta:', error);
            throw error;
        }
    },

    deactivate: async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/motorcycles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al desactivar la motocicleta:', error);
            throw error;
        }
    }
};