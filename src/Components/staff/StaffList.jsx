import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/Style.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
    confirmDelete(id);
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => deleteStaff(id)
        },
        {
          label: 'No',
          onClick: () => setDeleteId(null)
        }
      ]
    });
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/project/api/staffs/${id}`);
      let updatedStaffs = staffs.filter(staff => staff.staffId !== id);
      setStaffs(updatedStaffs);
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
                  {staff.username !== "admin" && (
                    <>
                      <Link to={`/updateStaff/${staff.staffId}`} className="button-edit">✏️</Link>
                      <button className="button-delete" onClick={() => handleDeleteClick(staff.staffId)}>🗑️</button>
                    </>
                  )}
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
