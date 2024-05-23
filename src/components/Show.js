import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
    // 1- Configurar hooks
    const [referencias, setReferencias] = useState([]);

    // 2- Referenciar a la DB Firestore
    const referenciaCollection = collection(db, 'referencia');

    // 3- Función para mostrar todos los documentos
    const getReferencias = async () => {
        const data = await getDocs(referenciaCollection);
        setReferencias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    };

    // 4- Función para eliminar un documento
    const deleteReferencia = async (id) => {
        const referenciaDoc = doc(db, 'referencia', id);
        await deleteDoc(referenciaDoc);
        getReferencias();
    };

    const confirmDelete = (id) => {
        MySwal.fire({
          title: '¿Eliminar el producto?',
          text: "No se podra arrepentir, esto no es tu ex",
          icon: 'OJOOOO',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Efectivamente, borremoslo'
        }).then((result) => {
          if (result.isConfirmed) { 
            //llamamos a la funcion para eliminar   
            deleteReferencia(id)               
            Swal.fire(
              'Borrado',
              'Se borro, yaper',
              'Excitante o exitoso como se diga'
            )
          }
        })    
      }

    // 6- Usamos useEffect para obtener los datos cuando el componente se monta
    useEffect(() => {
        getReferencias();
    }, []);

    // 7- Devolvemos vista a nuestro componente
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Crear usuario</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referencias.map((referencia) => (
                                    <tr key={referencia.id}>
                                        <td>{referencia.nombre}</td>
                                        <td>{referencia.edad}</td>
                                        <td>
                                            <Link to={`/edit/${referencia.id}`} className='btn btn-light'>Editar</Link>
                                            <button onClick={() => {confirmDelete(referencia.id)}} className='btn btn-danger'>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
