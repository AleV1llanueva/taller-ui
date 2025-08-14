import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motorcycleService } from '../services/motorcycleService';

const MotorcycleForm = ({ item, brands, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        id_marca: item?.id_marca || '',
        name: item?.name || '',
        active: item?.active ?? true
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { validateToken } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (error) setError('');
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!validateToken()) {
            return;
        }

        if (!formData.id_marca.trim()) {
            setError('La marca es requerida');
            return;
        }

        if (!formData.name.trim()) {
            setError('El nombre es requerido');
            return;
        }

        const namePattern = /^[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
        if (!namePattern.test(formData.name)) {
            setError('El nombre solo puede contener letras, números, espacios, apostrofes y guiones');
            return;
        }

        setIsSubmitting(true);

        try {
            setError('');
            let savedItem;
            
            if (item) {
                savedItem = await motorcycleService.update(item.id, formData);
                if (!savedItem) {
                    savedItem = { ...item, ...formData };
                }
                onSuccess(savedItem, true);
            } else {
                savedItem = await motorcycleService.create(formData);
                if (!savedItem) {
                    savedItem = { 
                        id: Date.now().toString(),
                        ...formData 
                    };
                }
                onSuccess(savedItem, false);
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            setError(error.message || 'Error al guardar la motocicleta');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isSubmitting) {
            handleSubmit();
        }
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    const activeBrands = brands.filter(type => type.active);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {item ? 'Editar Motocicleta' : 'Nuevo Motocicleta'}
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            <div className="flex items-center">
                                <span className="mr-2">❌</span>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="id_marca" className="block text-sm font-medium text-gray-700 mb-1">
                                Marca de Motocicleta *
                            </label>
                            <select
                                id="id_marca"
                                name="id_marca"
                                value={formData.id_marca}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Seleccionar Marca</option>
                                {activeBrands.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej: XR, Tenere, DR"
                                maxLength="100"
                                autoFocus={!item}
                            />
                        </div>

                        {/* {formData.cost && formData.discount > 0 && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                <div className="text-sm text-blue-800">
                                    <strong>Vista previa del precio:</strong>
                                </div>
                                <div className="text-lg font-medium text-blue-900">
                                    <span className="line-through text-gray-500 mr-2">
                                        L. {parseFloat(formData.cost).toFixed(2)}
                                    </span>
                                    L. {(parseFloat(formData.cost) * (1 - formData.discount / 100)).toFixed(2)}
                                    <span className="text-sm text-blue-700 ml-2">
                                        ({formData.discount}% descuento)
                                    </span>
                                </div>
                            </div>
                        )} */}

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="active"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                                Activo
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50 transition-colors"
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotorcycleForm;