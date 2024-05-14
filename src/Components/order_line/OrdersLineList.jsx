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
                // Se hace una solicitud GET a la api para obtener los datos de las lineas de pedido
                const response = await axios.get('http://localhost:8082/project/api/ordersLine');
                setOrderLines(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        // Llamada a la funcion para obtener la lista de lineas de pedido
        fetchOrderLinesList();
    }, []);

    useEffect(() => {
        const fetchDishNames = async () => {
            const names = {};
            for (const orderLine of orderLines) {
                try {
                    // Verifica si existe un plato asociado con la linea de pedido
                    if (orderLine.dish) {
                        // Verifica si el categoryId del plato es distinto de 1 para no mostrar las bebidas
                        if (orderLine.dish.categoryDish.categoryId !== 1) {
                            // Obtiene el nombre del plato del objeto dish
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

    const handleEditClick = async (orderId) => {
        try {
            // Realiza la solicitud PATCH para actualizar el campo orderStatus a 2
            await axios.patch(`http://localhost:8082/project/api/orders/${orderId}`, { orderStatus: 2 });
            // Elimina el pedido (orderLine) de la pantalla actualizando el estado de orderLines
            setOrderLines(prevOrderLines => prevOrderLines.filter(orderLine => orderLine.orderId !== orderId));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };    

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="orders-line-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Nota</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderLines.map(orderLine => (
                            // Verifica si el dishName no está vacío antes de renderizar la fila
                            (dishNames[orderLine.orderLineId] && (
                                <tr key={orderLine.orderLineId}>
                                    <td>{dishNames[orderLine.orderLineId]}</td>
                                    <td>{orderLine.quantity}</td>
                                    <td>{orderLine.note}</td>
                                    <td><button className="button-edit" onClick={() => handleEditClick(orderLine.orderId)}>✅</button></td>
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
