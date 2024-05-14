import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from '../../navbar/Navbar';
import { useForm } from 'react-hook-form';

function AddDish() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

    // Define los mensajes de validacion
    const messages = {
      req: "Este campo es obligatorio",
      dishName: "Solo se admiten caracteres alfanuméricos",
      dishName_length: "El nombre debe tener al menos 4 caracteres",
      price: "No puede introducir valores negativos",
      vat: "No puede introducir valores negativos",
      dishDescription: "La descripción debe tener al menos 6 caracteres"
    };
  
    // Define los patrones de validacion de campos
    const patterns = {
      dishName: /^[A-Za-z0-9]+$/i,
      dishName_length: /^.{4,}$/,
      price: /^(?!-)\d+(\.\d+)?$/, 
      vat: /^(?!-)\d+(\.\d+)?$/,
      dishDescription: /^.{6,}$/
    };

    // Utiliza el hook useForm para manejar el estado y las validaciones del formulario
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8082/project/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8082/project/api/dishes', {
        ...data,
        categoryDish: {
          categoryId: data.categoryId,
          categoryName: categories.find(category => category.categoryId === parseInt(data.categoryId)).categoryName
        }
      });
      navigate("/admin");
    } catch (error) {
      console.error('Error creating dish:', error);
    }
  };

  // Accede a los valores de los campos de entrada utilizando watch
  const dishName = watch('dishName');
  const price = watch('price');
  const vat = watch('vat');
  const dishDescription = watch('dishDescription');

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
            <form onSubmit={handleSubmit(onSubmit)}>
            <MDBInput wrapperClass='mb-4' label='Nombre del plato' id='username' type='text' size="lg" {...register('dishName', { required: messages.req, pattern: { value: patterns.dishName, message: messages.dishName}, minLength: { value: 4, message: messages.dishName_length  } })} />
              {errors.dishName && <p style={{ color: 'red' }}>{errors.dishName.message}</p>}
              {errors.dishName_length && <p style={{ color: 'red' }}>{errors.dishName_length.message}</p>}
              <MDBInput wrapperClass='mb-4' label='Precio' id='price' type='number' size="lg" {...register('price', { required: messages.req, pattern: { value: patterns.price, message: messages.price} })} />
              {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}
              <MDBInput wrapperClass='mb-4' label='IVA' id='vat' type='number' size="lg" {...register('vat', { required: messages.req, pattern: { value: patterns.vat, message: messages.vat} })} />
              {errors.vat && <p style={{ color: 'red' }}>{errors.vat.message}</p>}
              <MDBInput wrapperClass='mb-4' label='Descripción del plato' id='dishDescription' type='text' size="lg" {...register('dishDescription', { required: messages.req, pattern: { value: patterns.dishDescription, message: messages.dishDescription} })} />
              {errors.dishDescription && <p style={{ color: 'red' }}>{errors.dishDescription.message}</p>}
              <div className="mb-4">
                <select
                  id="categoryId"
                  className="form-select"
                  {...register('categoryId', { required:messages.req })}
                >
                  <option value="">Categoría</option>
                  {categories.map(category => (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                  ))}
                </select>
                {errors.categoryId && <p style={{ color: 'red' }}>{errors.categoryId.message}</p>}
              </div>
              <div className="d-flex justify-content-center">
                <MDBBtn className="mb-4 custom-btn-width" color='dark' size='lg' type="submit">Crear</MDBBtn>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver</Link>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default AddDish;
