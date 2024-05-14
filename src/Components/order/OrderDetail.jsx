import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dishNames, setDishNames] = useState({});
    const orderStatusMap = {
        1: 'En proceso',
        2: 'Preparado'
    };

    useEffect(() => {
        setLoading(true);

        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/project/api/orders/${orderId}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    useEffect(() => {
        const fetchDishNames = async () => {
            const names = {};
            for (const orderLine of order.orderLines) {
                try {
                    if (orderLine.dish) {
                        if (orderLine.dish.categoryDish.categoryId !== 1) {
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

        if (order && order.orderLines && order.orderLines.length > 0) {
            fetchDishNames();
        }
    }, [order]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            {order ? (
                <div>
                    <h2 style={{ marginTop: '1%' }} className='admin-title'>Detalles del pedido</h2>
                    <div className="orders-line-container">
                        <p>Mesa: {order.orderTable}</p>
                        <p>Estado: {orderStatusMap[order.orderStatus]}</p><br />
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.orderLines && order.orderLines.map(orderLine => (
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
                    <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg" style={{ marginLeft: '1%' }}>Volver a Admin</Link>
                    <Link to="/lounge" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg" style={{ marginLeft: '1%' }}>Volver a Lounge</Link>
                </div>
            ) : (
                <p>No se encontraron detalles para este pedido.</p>
            )}
        </div>
    );
};

export default OrderDetail;
