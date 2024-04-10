import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Style/Style.css'

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedStaff, setUpdatedStaff] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchStaffList = async () => {
      try {
        const response = await axios.get('http://localhost:8082/project/api/staffs');
        setStaffs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchStaffList();
  }, [showCreateModal, updatedStaff]);

  const remove = async (id) => {
    try {
      await axios.delete('http://localhost:8082/project/api/staffs/${id}');
      let updatedStaffs = staffs.filter(staff => staff.staffId !== id);
      setStaffs(updatedStaffs);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const update = async (id, newStaff) => {
    try {
      await axios.put('http://localhost:8082/project/api/staffs/${id}', newStaff);
      setUpdatedStaff(newStaff);
      setSelectedStaff(null); // Limpiamos el usuario seleccionado
      setShowUpdateModal(false); // Cerramos el modal después de actualizar
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleUpdateModal = (staff) => {
    setSelectedStaff(staff);
    setShowUpdateModal(true);
  };

  const handleCreateStaff = async () => {
    try {
      const response = await axios.post('http://localhost:8082/project/api/staffs', {
        username: newStaffName,
        password: newStaffPassword,
        locked: false,
        disabled: false
      });
      setStaffs([...staffs, response.data]);
      setShowCreateModal(false);
      setNewStaffName('');
      setNewStaffPassword('');
    } catch (error) {
      console.error('Error creating staff:', error);
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
            <h3>Crear nuevo usuario</h3>
            <form>
              <label htmlFor="create-username">Nombre: </label>
              <input
                type="text"
                id="create-username"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
              /><br /><br />
              <label htmlFor="create-password">Contraseña: </label>
              <input
                type="password"
                id="create-password"
                value={newStaffPassword}
                onChange={(e) => setNewStaffPassword(e.target.value)}
              /><br /><br />
              <button className="button-create" type="button" onClick={handleCreateStaff}>Crear</button>
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && selectedStaff && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>×</span>
            <h3>Editar usuario</h3>
            <form>
              <label htmlFor="update-username">Nombre: </label>
              <input
                type="text"
                id="update-username"
                value={selectedStaff.username}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, username: e.target.value })}
              /><br /><br />
              <label htmlFor="update-password">Contraseña: </label>
              <input
                type="password"
                id="update-password"
                value={selectedStaff.password}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, password: e.target.value })}
              /><br /><br />
              <button className="button-edit" type="button" onClick={() => update(selectedStaff.staffId, selectedStaff)}>Actualizar</button>
            </form>
          </div>
        </div>
      )}

      <div className="staff-container">
        <button className="button-create" onClick={() => setShowCreateModal(true)}>Crear usuario</button><br />
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map(staff => (
              <tr key={staff.staffId}>
                <td>{staff.username}</td>
                <td>
                  <button className="button-delete" onClick={() => remove(staff.staffId)}>❌</button>
                  <button className="button-edit" onClick={() => handleUpdateModal(staff)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default StaffList;


