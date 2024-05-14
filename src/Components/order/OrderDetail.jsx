import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import '../../style/Style.css';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderLines, setOrderLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dishNames, setDishNames] = useState({});

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

        const fetchOrderLinesList = async () => {
            try {
                const response = await axios.get('http://localhost:8082/project/api/ordersLine');
                setOrderLines(response.data);
            } catch (error) {
                console.error('Error fetching order lines:', error);
            }
        };

        fetchOrderDetails();
        fetchOrderLinesList();
    }, [orderId]);

    useEffect(() => {
        const fetchDishNames = async () => {
            const names = {};
            for (const orderLine of orderLines) {
                try {
                    if (orderLine.dish && orderLine.orderId === parseInt(orderId)) {
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

        if (orderLines.length > 0) {
            fetchDishNames();
        }
    }, [orderLines, orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const orderStatusMap = {
        1: 'En proceso',
        2: 'Preparado'
    };

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
                                {orderLines.map(orderLine => (
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
