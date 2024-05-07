import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { token } = useAuth();

    // Efecto para cargar la lista de platos cuando reciba el token
    useEffect(() => {
        if (!token) return;
        setLoading(true);

        // Funcion para obtener la lista de platos desde la api
        const fetchDishesList = async () => {
            try {
                // Se hace una solicitud GET a la api para obtener la lista de platos
                const response = await axios.get('http://localhost:8082/project/api/dishes');
                // Se establece el estado de los platos con los datos obtenidos
                setDishes(response.data);
                // Se desactiva el estado de carga
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        // Llamada a la funcion para obtener la lista de platos
        fetchDishesList();
    }, [token]);

    // Funcion para manejar el clic en el boton de eliminar un plato
    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    // Funcion para confirmar la eliminacion del plato
    const confirmDelete = async () => {
        try {
            // Se realiza una solicitud DELETE a la api para eliminar el plato con un id concreto
            await axios.delete(`http://localhost:8082/project/api/dishes/${deleteId}`);
            // Se filtran los platos actualizados excluyendo el plato eliminado
            let updatedDishes = dishes.filter(dish => dish.dishId !== deleteId);
            setDishes(updatedDishes);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    // Agrupa platos por categoria
    const groupedDishes = dishes.reduce((acc, dish) => {
        acc[dish.categoryDish.categoryName] = acc[dish.categoryDish.categoryName] || [];
        acc[dish.categoryDish.categoryName].push(dish);
        return acc;
    }, {});

    // Ordena las categorias por id
    const sortedCategories = Object.entries(groupedDishes).sort((a, b) => {
        return a[1][0].categoryDish.categoryId - b[1][0].categoryDish.categoryId;
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="dishes-container">
                <Link to="/addDish"><button className='button-create'>Crear plato</button></Link><br />
                {sortedCategories.map(([category, categoryDishes]) => (
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
                                {categoryDishes.map(dish => (
                                    <tr key={dish.dishId}>
                                        <td>{dish.dishName}</td>
                                        <td>{dish.price}€</td>
                                        <td>
                                            <Link to={`/updateDish/${dish.dishId}`} className="button-edit">✏️</Link>
                                            <button className="button-delete" onClick={() => handleDeleteClick(dish.dishId)}>🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
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
