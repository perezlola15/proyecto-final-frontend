import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DishesList = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [orderStatus] = useState(1); // Estado "EN PROCESO"
    const [notes, setNotes] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        // Funcion para obtener la lista de platos desde la api
        const fetchDishesList = async () => {
            try {
                // Se hace una solicitud GET a la api para obtener la lista de platos
                const response = await axios.get('http://localhost:8082/project/api/dishes');
                // Se establece la lista de platos en el estado, con la cantidad inicializada en 0
                setDishes(response.data.map(dish => ({ ...dish, quantity: 0 })));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        // Llamada a la funcion para obtener la lista de platos
        fetchDishesList();
    }, []);

    // Funcion para manejar el evento de añadir un plato
    const handleAddClick = (dishId) => {
         // Actualizacion del estado de los platos, incrementando la cantidad del plato seleccionado
        setDishes(prevDishes => {
            return prevDishes.map(dish => {
                if (dish.dishId === dishId) {
                    return { ...dish, quantity: dish.quantity + 1 };
                }
                return dish;
            });
        });
    };

    // Funcion para manejar el evento de eliminar un plato
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

     // Funcion para manejar las notas de un plato
    const handleNoteChange = (dishId, value) => {
        // Actualizacion del estado de las notas de los platos
        setNotes(prevNotes => ({
            ...prevNotes,
            [dishId]: value
        }));
    };

    // Funcion para crear un nuevo pedido
    const handleCreateOrder = async () => {
        const orderData = {
            orderDate: new Date(),
            orderStatus,
            orderTable: selectedTable,
            staffId: 1
        };

        try {
            // Crea el pedido
            const response = await axios.post('http://localhost:8082/project/api/orders', orderData);
            console.log('Order created:', response.data);
            // Obtiene el id del pedido creado
            const orderId = response.data.orderId;

            // Envia cada linea de pedido individualmente con sus datos
            for (const dish of dishes) {
                if (dish.quantity > 0) {
                    const orderLineData = {
                        quantity: dish.quantity,
                        note: notes[dish.dishId] || "",
                        dishId: dish.dishId,
                        orderId: orderId
                    };
                    //console.log('Order Line Data:', orderLineData);

                    // Inserta el producto en la tabla order_line
                    await axios.post('http://localhost:8082/project/api/ordersLine', orderLineData);
                    console.log('Order line created successfully');
                }
            }
            console.log('All order lines created successfully');
            // Si se actualiza correctamente el plato, se redirige al panel de admin
            //navigate("/admin");
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // Agrupa platos por categoria
    const groupedDishes = dishes.reduce((acc, dish) => {
        acc[dish.categoryDish.categoryName] = acc[dish.categoryDish.categoryName] || [];
        acc[dish.categoryDish.categoryName].push(dish);
        return acc;
    }, {});

    // Ordena las categorias por su id
    const sortedCategories = Object.keys(groupedDishes).sort((a, b) => {
        const categoryA = groupedDishes[a][0].categoryDish.categoryId;
        const categoryB = groupedDishes[b][0].categoryDish.categoryId;
        return categoryA - categoryB;
    });

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
                {sortedCategories.map(category => (
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
            <button className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg" style={{ marginLeft: '1%' }} onClick={handleCreateOrder}>Crear Pedido</button>
            <button className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg" style={{ marginLeft: '1%' }}>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Volver atrás</Link>
            </button>
        </div>
    );
};

export default DishesList;
