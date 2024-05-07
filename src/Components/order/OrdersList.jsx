import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Style.css';
import { Link } from 'react-router-dom';

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

        // Funcion para obtener la lista de pedidos desde la api
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
        // Llamada a la funcion para obtener la lista de pedidos
        fetchOrdersList();
    }, []);

    // Funcion para manejar el evento de eliminar un pedido
    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    // Funcion para manejar el evento de confirmar la eliminacion de un pedido
    const confirmDelete = async () => {
        try {
            // Se realiza una solicitud DELETE a la api para eliminar el pedido con un id concreto
            await axios.delete(`http://localhost:8082/project/api/orders/${deleteId}`);
            // Se filtran los pedido actualizados excluyendo el pedido eliminado
            let updatedOrders = orders.filter(order => order.orderId !== deleteId);
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
                            <th>ID</th>
                            <th>Estado</th>
                            <th>Mesa</th>

                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{orderStatusMap[order.orderStatus]}</td>
                                <td>{order.orderTable}</td>

                                <td>
                                    <Link to={`/updateOrder/${order.orderId}`} className="button-edit">✏️</Link>
                                    <button className="button-delete" onClick={() => handleDeleteClick(order.orderId)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {deleteId !== null && (
                <div className="confirmation-message">
                    <p>¿Estás seguro de que deseas eliminar esta orden?</p>
                    <div>
                        <button className="confirm-button" onClick={confirmDelete}>Sí</button>
                        <button className="cancel-button" onClick={() => setDeleteId(null)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersList;
