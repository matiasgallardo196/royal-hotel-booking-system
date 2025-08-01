import { createContext, useEffect, useState } from "react";
import URL_AXIOS from "../config/envs"
import axios from "axios"



export const UserContext = createContext(
    {user:"",
    userAppointments:[],
    registerUser: async()=>{},
    login: async()=>{},
    logout:async()=>{},
    createAppointment:async()=>{},
    getAppointments:async()=>{},
    cancelAppointment:async()=>{},

    }
)

export const UserProvider =({children})=>{
    const [user,setUser]=useState()


    useEffect(()=>{
        
         setUser(JSON.parse(sessionStorage.getItem('user')))
    },[])

    const login=async(error,datosLogin)=>{
        if(error.username|| error.password) throw new Error
        const respuesta = await axios.post(`${URL_AXIOS}/users/login`,datosLogin)
        const user=respuesta.data.user
        user.token=respuesta.data.token
        
        setUser(user);
        console.log(user)
        sessionStorage.setItem('user', JSON.stringify(user));

        return respuesta
    }
    const registerUser= async(errors,datosFormulario,imgCloudinary)=>{ 
        if(Object.keys(errors).length>0) throw new Error

        const datosAEnviar = {...datosFormulario,nDni: Number(datosFormulario.nDni)}
        datosAEnviar.file= await imgCloudinary(datosFormulario.file)

        const respuesta=await axios.post(`${URL_AXIOS}/users/register`,datosAEnviar)
    
        
        return respuesta
    }
     const createAppointment=async(errors,datosFormulario)=>{
        if(Object.keys(errors).length>0) throw new Error

            const datosAEnviar = {...datosFormulario}
            datosAEnviar.userId=user.id
            const respuesta=await axios.post(`${URL_AXIOS}/appointments/schedule`,datosAEnviar,{headers: { Authorization: `Bearer ${user.token}` }})
            return respuesta
     }
     const getAppointments=async()=>{
        
        let respuesta
        await axios.get(`${URL_AXIOS}/users/${user.id}`,{headers: { Authorization: `Bearer ${user.token}` }}).
        then(res=>{respuesta=res.data.appointments})
        return respuesta
     }
     const cancelAppointment=async(id)=>{

        const res = await axios.put(`${URL_AXIOS}/appointments/cancel/${id}`, {}, { headers: { Authorization: `Bearer ${user.token}` } })
        delete res.data.user
        return res.data
     }

    const logout=()=> {
        sessionStorage.removeItem('user')
        setUser(null)
    }

    const value={
        user,
        registerUser,
        login,
        logout,
        createAppointment,
        getAppointments,
        cancelAppointment,
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


