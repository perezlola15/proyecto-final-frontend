import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';
import { Link } from 'react-router-dom';

const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
    }, []);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8082/project/api/dishes/${deleteId}`);
            let updatedDishes = dishes.filter(dish => dish.dishId !== deleteId);
            setDishes(updatedDishes);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="dishes-container">
            <Link to="/addDish"><button className='button-create'>Crear plato</button></Link><br />
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map(dish => (
                            <tr key={dish.dishId}>
                                <td>{dish.dishName}</td>
                                <td>{dish.price}€</td>
                                <td> 
                                    <Link to="/updateDish" className="button-edit">✏️</Link>
                                    <button className="button-delete" onClick={() => handleDeleteClick(dish.dishId)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {deleteId !== null && (
                <div className="confirmation-message">
                    <p>¿Estás seguro de que deseas eliminar este plato?</p>
                    <div>
                        <button className="confirm-button" onClick={confirmDelete}>Sí</button>
                        <button className="cancel-button" onClick={() => setDeleteId(null)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DishesList;
