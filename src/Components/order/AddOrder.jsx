import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';

const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const [quantity, setQuantity] = useState(0);

    const handleAddClick = (dishId) => {
        // Aquí puedes implementar la lógica para agregar el plato al pedido
        console.log(`Añadir plato con ID ${dishId} (${quantity} unidades)`);
    };

    // Agrupar platos por categoría
    const groupedDishes = dishes.reduce((acc, dish) => {
        acc[dish.categoryDish.categoryName] = acc[dish.categoryDish.categoryName] || [];
        acc[dish.categoryDish.categoryName].push(dish);
        return acc;
    }, {});

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="dishes-container">
                {Object.keys(groupedDishes).map(category => (
                    <div className="dishes-container" key={category}>
                        <h3>{category}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Añadir</th>
                                    <th>Notas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedDishes[category].map(dish => (
                                    <tr key={dish.dishId}>
                                        <td>{dish.dishName}</td>
                                        <td>{dish.price}€</td>
                                        <td>
                                            <button className="button-add" onClick={() => setQuantity(quantity + 1)}>➕</button>
                                            {quantity}
                                        </td>
                                        <td><input type="text" placeholder="Añadir notas" /></td>
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
