import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newOrderTable, setNewOrderTable] = useState('');
    const [newOrderStaffId, setNewOrderStaffId] = useState('');
    const [newOrderStatus, setNewOrderStatus] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterDate, setFilterDate] = useState('');
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
    }, [showCreateModal, showUpdateModal]); // Actualiza la lista de órdenes cuando se crea o actualiza una

    const removeOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/project/api/orders/${id}`);
            let updatedOrders = orders.filter(order => order.orderId !== id);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const updateOrder = async (id, updatedOrder) => {
        try {
            await axios.put(`http://localhost:8082/project/api/orders/${id}`, updatedOrder);
            setShowUpdateModal(false); // Cerrar modal después de actualizar
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleUpdateModal = (order) => {
        setSelectedOrder(order);
        setShowUpdateModal(true);
    };

    const handleCreateOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8082/project/api/orders', {
                orderTable: newOrderTable,
                staffId: newOrderStaffId,
                orderStatus: newOrderStatus
            });
            setOrders([...orders, response.data]);
            setShowCreateModal(false);
            // Limpiar los campos después de crear la orden
            setNewOrderTable('');
            setNewOrderStaffId('');
            setNewOrderStatus('');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleFilterByDate = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8082/project/api/orders?date=${filterDate}');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCreateModal(false)}>×</span>
                        <h3>Crear Nueva Orden</h3>
                        <form>
                            <label htmlFor="create-orderTable">Mesa:</label>
                            <input
                                type="text"
                                id="create-orderTable"
                                value={newOrderTable}
                                onChange={(e) => setNewOrderTable(e.target.value)}
                            /><br /><br />
                            <label htmlFor="create-staffId">ID del Personal:</label>
                            <input
                                type="text"
                                id="create-staffId"
                                value={newOrderStaffId}
                                onChange={(e) => setNewOrderStaffId(e.target.value)}
                            /><br /><br />
                            <label htmlFor="create-orderStatus">Estado de la Orden:</label>
                            <input
                                type="text"
                                id="create-orderStatus"
                                value={newOrderStatus}
                                onChange={(e) => setNewOrderStatus(e.target.value)}
                            /><br /><br />
                            <button type="button" onClick={handleCreateOrder}>Crear</button>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateModal && selectedOrder && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowUpdateModal(false)}>×</span>
                        <h3>Editar Orden</h3>
                        <form>
                            <label htmlFor="update-orderTable">Mesa:</label>
                            <input
                                type="text"
                                id="update-orderTable"
                                value={selectedOrder.orderTable}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, orderTable: e.target.value })}
                            /><br /><br />
                            <label htmlFor="update-staffId">ID del Personal:</label>
                            <input
                                type="text"
                                id="update-staffId"
                                value={selectedOrder.staffId}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, staffId: e.target.value })}
                            /><br /><br />
                            <label htmlFor="update-orderStatus">Estado de la Orden:</label>
                            <input
                                type="text"
                                id="update-orderStatus"
                                value={selectedOrder.orderStatus}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })}
                            /><br /><br />
                            <button type="button" onClick={() => updateOrder(selectedOrder.orderId, selectedOrder)}>Actualizar</button>
                        </form>
                    </div>
                </div>
            )}
            <div className="filter-orders">
                <input
                    type="date"
                    id="filter-date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                /><br />
                <button className="button-filter" onClick={handleFilterByDate}>Filtrar</button><br />
            </div>
            <div className="orders-container">
                <button className="button-create" onClick={() => setShowCreateModal(true)}>Crear pedido</button><br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Estado</th>
                            <th>Mesa</th>
                            <th>Staff</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{orderStatusMap[order.orderStatus]}</td>
                                <td>{order.orderTable}</td>
                                <td>{order.staff.staffId}</td>
                                <td>
                                    <button className="button-delete" onClick={() => removeOrder(order.orderId)}>🗑️</button>
                                    <button className="button-edit" onClick={() => handleUpdateModal(order)}>✏️</button>
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
