import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [orderStatus, setOrderStatus] = useState(1); // Estado "EN PROCESO"
    const [notes, setNotes] = useState({});

    useEffect(() => {
        setLoading(true);

        const fetchDishesList = async () => {
            try {
                const response = await axios.get('http://localhost:8082/project/api/dishes');
                setDishes(response.data.map(dish => ({ ...dish, quantity: 0 })));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchDishesList();

    }, []);

    const handleAddClick = (dishId) => {
        setDishes(prevDishes => {
            return prevDishes.map(dish => {
                if (dish.dishId === dishId) {
                    return { ...dish, quantity: dish.quantity + 1 };
                }
                return dish;
            });
        });
    };

    const handleRemoveClick = (dishId) => {
        setDishes(prevDishes => {
            return prevDishes.map(dish => {
                if (dish.dishId === dishId && dish.quantity > 0) {
                    return { ...dish, quantity: dish.quantity - 1 };
                }
                return dish;
            });
        });
    };

    const handleNoteChange = (dishId, value) => {
        setNotes(prevNotes => ({
            ...prevNotes,
            [dishId]: value
        }));
    };

    const handleCreateOrder = async () => {
        const orderData = {
            orderDate: new Date(),
            orderStatus,
            orderTable: selectedTable,
            staffId: 1
        };

        try {
            // Crear el pedido
            const response = await axios.post('http://localhost:8082/project/api/orders', orderData);
            console.log('Order created:', response.data);

            // Obtener el ID del pedido recién creado
            const orderId = response.data.orderId;

            // Filtrar las líneas de pedido para enviar solo aquellas con cantidad mayor que cero
            const orderLineData = dishes
                .filter(dish => dish.quantity > 0)
                .map(dish => ({
                    quantity: dish.quantity,
                    note: notes[dish.dishId] || "",
                    dish_id: dish.dishId,
                    order_id: orderId
                }));

            console.log('Order Line Data:', orderLineData);

            // Insertar los productos en la tabla order_line
            await axios.post('http://localhost:8082/project/api/ordersLine', orderLineData);
            console.log('Order lines created successfully');

            // Aquí podrías manejar alguna lógica adicional después de crear el pedido y las líneas de pedido
        } catch (error) {
            console.error('Error creating order:', error);
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
            <div className="navbar">
                <img src="/img/logo.png" alt="Logo" />
            </div>
            <div className="dishes-container add">
                <div className="table-select-container">
                    <p>Mesa:</p>
                    <input type="number" className='selected-table' value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} />
                </div>
                <br />
                {Object.keys(groupedDishes).map(category => (
                    <div className="category-container" key={category}>
                        <h3>{category}</h3>
                        <table key={category} className="custom-table">
                            <thead>
                                <tr>
                                    <th className="custom-th">Nombre</th>
                                    <th className="custom-th">Precio</th>
                                    <th className="custom-th">Añadir</th>
                                    <th className="custom-th">Notas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedDishes[category].map(dish => (
                                    <tr key={dish.dishId}>
                                        <td className="custom-td">{dish.dishName}</td>
                                        <td className="custom-td">{dish.price}€</td>
                                        <td className="custom-td">
                                            <div className="quantity-container">
                                                <button className="button-add" onClick={() => handleAddClick(dish.dishId)}>➕</button>
                                                <button className="button-remove" onClick={() => handleRemoveClick(dish.dishId)}>➖</button>
                                                <span>{dish.quantity}</span>
                                            </div>
                                        </td>
                                        <td className="custom-td">
                                            <input type="text" placeholder="Añadir notas" value={notes[dish.dishId] || ""}
                                                onChange={(e) => handleNoteChange(dish.dishId, e.target.value)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <button className='add-order' onClick={handleCreateOrder}>Crear Pedido</button>
            <button className='add-order'><Link to="/admin">Volver atrás</Link></button>
        </div>
    );
};

export default DishesList;
