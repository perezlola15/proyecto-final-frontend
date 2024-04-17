import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/Style.css';

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/project/api/staffs/${deleteId}`);
      let updatedStaffs = staffs.filter(staff => staff.staffId !== deleteId);
      setStaffs(updatedStaffs);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="staff-container">
        <Link to="/addStaff"><button className='button-create'>Crear usuario</button></Link><br />
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
                <Link to={`/updateStaff/${staff.staffId}`} className="button-edit">✏️</Link>
                  <button className="button-delete" onClick={() => handleDeleteClick(staff.staffId)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId !== null && (
        <div className="confirmation-message">
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          <div>
            <button className="confirm-button" onClick={confirmDelete}>Sí</button>
            <button className="cancel-button" onClick={() => setDeleteId(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffList;
