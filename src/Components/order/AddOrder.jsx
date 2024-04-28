import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';

const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [staffOptions, setStaffOptions] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState('');
    const [selectedTable, setSelectedTable] = useState('');
    const [orderStatus, setOrderStatus] = useState(1); // Estado "EN PROCESO"

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

        // Fetch staff data
        fetchStaffOptions();
    }, []);

    const fetchStaffOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8082/project/api/staff');
            setStaffOptions(response.data);
        } catch (error) {
            console.error('Error fetching staff data:', error);
        }
    };

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

    const handleCreateOrder = async () => {
        const orderData = {
            orderDate: new Date(),
            orderStatus,
            orderTable: selectedTable,
            staffId: selectedStaffId
        };

        try {
            const response = await axios.post('http://localhost:8082/project/api/orders', orderData);
            console.log('Order created:', response.data);
            // Aquí podrías manejar alguna lógica adicional después de crear el pedido
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
                <div className="staff-select-container">
                    <p>Staff:</p>
                    <select className='selected-staff' value={selectedStaffId} onChange={(e) => setSelectedStaffId(e.target.value)}>
                        <option value="">Seleccionar Personal</option>
                        {staffOptions.map(staff => (
                            <option key={staff.staffId} value={staff.staffId}>{staff.username}</option>
                        ))}
                    </select>
                </div>
                <div className="table-select-container">
                    <p>Mesa:</p>
                    <input type="number" className='selected-table' value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} />
                </div>
                <br />
                {Object.keys(groupedDishes).map(category => (
                    <div className="category-container" key={category}>
                        <h3>{category}</h3>
                        <table key={category}>
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
                                            <div className="quantity-container">
                                                <button className="button-add" onClick={() => handleAddClick(dish.dishId)}>➕</button>
                                                <button className="button-remove" onClick={() => handleRemoveClick(dish.dishId)}>➖</button>
                                                <span>{dish.quantity}</span>
                                            </div>
                                        </td>
                                        <td><input type="text" placeholder="Añadir notas" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <button className='add-order' onClick={handleCreateOrder}>Crear Pedido</button>
        </div>
    );
};

export default DishesList;
