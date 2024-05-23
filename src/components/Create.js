import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'


const Create = () => {
    const [nombre, setNombre] = useState ('')
    const [edad, setEdad] = useState (0)
    const navigate = useNavigate () 
    const referenciaCollection = collection(db, "referencia")
    const store = async (e) => {
        e.preventDefault()
        await addDoc( referenciaCollection, { nombre:nombre, edad: edad } )
        navigate('/')
        //console.log(e.target[0].value)
      }
  return (
    <div className='container'>
    <div className='row'>
        <div className='col'>
            <h1>Añadir usuario</h1>
             <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)} 
                        type="text"
                        className='form-control'
                    />
                </div>  
                <div className='mb-3'>
                    <label className='form-label'>Edad</label>
                    <input
                        value={edad}
                        onChange={ (e)=> setEdad(e.target.value)} 
                        type="number"
                        className='form-control'
                    />                 
                </div>  
                <button type='submit' className='btn btn-primary'>Guardar</button>
             </form>   
        </div>
    </div>
</div> 
)
  
}

export default Create
