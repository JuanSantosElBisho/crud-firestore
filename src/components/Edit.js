import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [ nombre, setNombre ] = useState('')
    const [ edad, setEdad ] = useState(0)

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const referencia = doc(db, "referencia", id)
        const data = {nombre: nombre, edad: edad}
        await updateDoc(referencia, data)
        navigate('/')
    }

    const getReferenciaById = async (id) => {
        const referencia = await getDoc( doc(db, "referencias", id) )
        if(referencia.exists()) {
            //console.log(product.data())
            setNombre(referencia.data().nombre)    
            setEdad(referencia.data().edad)
        }else{
            console.log('El usuario no existe')
        }
    }

    useEffect( () => {
        getReferenciaById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar usuario</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>nombre</label>
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

export default Edit
