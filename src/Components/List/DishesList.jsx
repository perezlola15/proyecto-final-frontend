import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newDishName, setNewDishName] = useState('');
    const [newDishPrice, setNewDishPrice] = useState('');
    const [newDishVat, setNewDishVat] = useState('');
    const [newDishDescription, setNewDishDescription] = useState('');
    const [newDishCategory, setNewDishCategory] = useState('');
    const [selectedDish, setSelectedDish] = useState(null);

    useEffect(() => {
        setLoading(true);

        const fetchDishesList = async () => {
            try {
                const response = await axios.get('http://localhost:8082/project/api/dishes');
                setDishes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchDishesList();
    }, [showCreateModal, showUpdateModal]); // Actualiza la lista de platos cuando se crea o actualiza uno

    const removeDish = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/project/api/dishes/${id}`);
            let updatedDishes = dishes.filter(dish => dish.dishId !== id);
            setDishes(updatedDishes);
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    const updateDish = async (id, updatedDish) => {
        try {
            await axios.put(`http://localhost:8082/project/api/dishes/${id}`, updatedDish);
            setShowUpdateModal(false); // Cerrar modal después de actualizar
        } catch (error) {
            console.error('Error updating dish:', error);
        }
    };

    const handleUpdateModal = (dish) => {
        setSelectedDish(dish);
        setShowUpdateModal(true);
    };

    const handleCreateDish = async () => {
        try {
            const response = await axios.post('http://localhost:8082/project/api/dishes', {
                dishName: newDishName,
                price: newDishPrice,
                vat: newDishVat,
                dishDescription: newDishDescription,
                categoryDish: newDishCategory
            });
            setDishes([...dishes, response.data]);
            setShowCreateModal(false);
            // Limpiar los campos después de crear el plato
            setNewDishName('');
            setNewDishPrice('');
            setNewDishVat('');
            setNewDishDescription('');
            setNewDishCategory('');
        } catch (error) {
            console.error('Error creating dish:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // Agrupar platos por categoría
    const groupedDishes = dishes.reduce((acc, dish) => {
        acc[dish.categoryDish.categoryName] = acc[dish.categoryDish.categoryName] || [];
        acc[dish.categoryDish.categoryName].push(dish);
        return acc;
    }, {});

    return (
        <div>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCreateModal(false)}>×</span>
                        <h3>Crear plato</h3>
                        <form>
                            <label htmlFor="create-dishName">Nombre:</label>
                            <input
                                type="text"
                                id="create-dishName"
                                value={newDishName}
                                onChange={(e) => setNewDishName(e.target.value)}
                            /><br /><br />
                            <label htmlFor="create-price">Precio:</label>
                            <input
                                type="number"
                                id="create-price"
                                value={newDishPrice}
                                onChange={(e) => setNewDishPrice(e.target.value)}
                            /><br /><br />
                            <label htmlFor="create-vat">Impuestos:</label>
                            <input
                                type="number"
                                id="create-vat"
                                value={newDishVat}
                                onChange={(e) => setNewDishVat(e.target.value)}
                            /><br /><br />
                            <label htmlFor="create-dishDescription">Descripción:</label>
                            <input
                                type="text"
                                id="create-dishDescription"
                                value={newDishDescription}
                                onChange={(e) => setNewDishDescription(e.target.value)}
                            /><br /><br />
                            <label htmlFor="create-categoryDish">Categoría:</label>
                            <input
                                type="text"
                                id="create-categoryDish"
                                value={newDishCategory}
                                onChange={(e) => setNewDishCategory(e.target.value)}
                            /><br /><br />
                            <button type="button" onClick={handleCreateDish}>Crear</button>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateModal && selectedDish && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowUpdateModal(false)}>×</span>
                        <h3>Editar plato</h3>
                        <form>
                            <label htmlFor="update-dishname">Nombre: </label>
                            <input
                                type="text"
                                id="update-dishname"
                                value={selectedDish.dishName}
                                onChange={(e) => setSelectedDish({ ...selectedDish, dishName: e.target.value })}
                            /><br /><br />
                            <label htmlFor="update-price">Precio: </label>
                            <input
                                type="text"
                                id="update-price"
                                value={selectedDish.price}
                                onChange={(e) => setSelectedDish({ ...selectedDish, price: e.target.value })}
                            /><br /><br />
                            <label htmlFor="update-vat">Impuestos:</label>
                            <input
                                type="number"
                                id="update-vat"
                                value={selectedDish.vat}
                                onChange={(e) => setSelectedDish({ ...selectedDish, vat: e.target.value })}
                            /><br /><br />
                            <label htmlFor="update-description">Descripción: </label>
                            <input
                                type="text"
                                id="update-description"
                                value={selectedDish.dishDescription}
                                onChange={(e) => setSelectedDish({ ...selectedDish, dishDescription: e.target.value })}
                            /><br /><br />
                            <button className="button-edit" type="button" onClick={() => updateDish(selectedDish.dishId, selectedDish)}>Actualizar</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="dishes-container">
                <button className="button-create" onClick={() => setShowCreateModal(true)}>Crear plato</button><br />
                {Object.keys(groupedDishes).map(category => (
                    <div className="dishes-container" key={category}>
                        <h3>{category}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedDishes[category].map(dish => (
                                    <tr key={dish.dishId}>
                                        <td>{dish.dishName}</td>
                                        <td>{dish.price}€</td>
                                        <td> 
                                            <button className="button-delete" onClick={() => removeDish(dish.dishId)}>🗑️</button>
                                            <button className="button-edit" onClick={() => handleUpdateModal(dish)}>✏️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DishesList;
