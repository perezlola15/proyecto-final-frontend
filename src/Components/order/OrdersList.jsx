import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const orderStatusMap = {
        1: 'En proceso',
        2: 'Preparado'
    };

    useEffect(() => {
        setLoading(true);

        const fetchOrdersList = async () => {
            try {
                const response = await axios.get('http://localhost:8082/project/api/orders');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchOrdersList();
    }, []);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        confirmDelete(id);
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de que deseas eliminar este pedido?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => deleteOrder(id)
                },
                {
                    label: 'No',
                    onClick: () => setDeleteId(null)
                }
            ]
        });
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/project/api/orders/${id}`);
            let updatedOrders = orders.filter(order => order.orderId !== id);
            setOrders(updatedOrders);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="orders-container">
                <Link to="/addOrder"><button className='button-create'>Crear pedido</button></Link><br />
                <table>
                    <thead>
                        <tr>
                            <th>Mesa</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderTable}</td>
                                <td>{orderStatusMap[order.orderStatus]}</td>
                                <td>
                                    <Link to={`/order/${order.orderId}`} className="button-see">👁️</Link>
                                    <Link to={`/updateOrder/${order.orderId}`} className="button-edit">✏️</Link>
                                    <button className="button-delete" onClick={() => handleDeleteClick(order.orderId)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;
