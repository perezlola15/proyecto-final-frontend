import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from '../../navbar/Navbar';

function AddDish() {
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [vat, setVat] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Se hace una solicitud GET a la API para obtener la lista de categorias
        const response = await axios.get('http://localhost:8082/project/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    // Llamada a la funcion para obtener las categorias
    fetchCategories();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crea el objeto categoryDish con los atributos
      const categoryDish = {
        categoryId,
        categoryName: categories.find(category => category.categoryId === parseInt(categoryId)).categoryName
      };

      // Envia el plato con categoryDish como un objeto
      await axios.post('http://localhost:8082/project/api/dishes', {
        dishName,
        price,
        vat,
        dishDescription,
        categoryDish
      });
      // Si la creacion del plato es correcta, redirige al panel de admin
      navigate("/admin");
    } catch (error) {
      console.error('Error creating dish:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard style={{ width: '500px' }}>
          <MDBCardBody className='p-5' style={{ marginTop: '-30px' }}>
            <div className='d-flex flex-row justify-content-center align-items-center mb-4'>
              <MDBIcon fas icon="cubes fa-3x me-3" />
              <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>Crear plato</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Nombre del plato' id='dishName' type='text' size="lg" value={dishName} onChange={(e) => setDishName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Precio' id='price' type='number' size="lg" value={price} onChange={(e) => setPrice(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='IVA' id='vat' type='number' size="lg" value={vat} onChange={(e) => setVat(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Descripción del plato' id='dishDescription' type='text' size="lg" value={dishDescription} onChange={(e) => setDishDescription(e.target.value)} />
              <div className="mb-4">
                <select
                  id="categoryId"
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(parseInt(e.target.value))}
                >
                  <option value="0">Categoría</option>
                  {categories.map(category => (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-center">
                <MDBBtn className="mb-4 custom-btn-width" color='dark' size='lg' type="submit">Crear</MDBBtn>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver atrás</Link>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default AddDish;
