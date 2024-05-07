import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';

const OrderLineList = () => {
    const [orderLines, setOrderLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dishNames, setDishNames] = useState({});

    useEffect(() => {
        setLoading(true);

        const fetchOrderLinesList = async () => {
            try {
                const response = await axios.get('http://localhost:8082/project/api/ordersLine');
                setOrderLines(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchOrderLinesList();
    }, []);

    useEffect(() => {
        const fetchDishNames = async () => {
            const names = {};
            for (const orderLine of orderLines) {
                try {
                    // Verificar si existe un plato asociado con la línea de pedido
                    if (orderLine.dish) {
                        // Verificar si el categoryId del plato es distinto de 1
                        if (orderLine.dish.categoryDish.categoryId !== 1) {
                            // Obtener el nombre del plato directamente del objeto dish
                            names[orderLine.orderLineId] = orderLine.dish.dishName;
                        }
                    } else {
                        names[orderLine.orderLineId] = 'Nombre no disponible';
                    }
                } catch (error) {
                    console.error('Error fetching dish name:', error);
                    names[orderLine.orderLineId] = 'Nombre no disponible';
                }
            }
            setDishNames(names);
        };
    
        if (orderLines.length > 0) {
            fetchDishNames();
        }
    }, [orderLines]);
    

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="orders-line-container">
                <table>
                    <thead>
                        <tr>
                            <th>Dish Name</th>
                            <th>Quantity</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderLines.map(orderLine => (
                            // Verificar si el dishName no está vacío antes de renderizar la fila
                            (dishNames[orderLine.orderLineId] && (
                                <tr key={orderLine.orderLineId}>
                                    <td>{dishNames[orderLine.orderLineId]}</td>
                                    <td>{orderLine.quantity}</td>
                                    <td>{orderLine.note}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderLineList;
