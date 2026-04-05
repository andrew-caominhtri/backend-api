"use client"

import { useState } from "react"

export default function AdminRegister(){

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleRegister = async ()=>{

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin-register`,{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    name,
    email,
    password
   })

  })

  const data = await res.json()

  alert("Admin created")

 }

 return(

  <div className="auth-container">

   <h2>Admin Register</h2>

   <input
    placeholder="Name"
    onChange={(e)=>setName(e.target.value)}
   />

   <input
    placeholder="Email"
    onChange={(e)=>setEmail(e.target.value)}
   />

   <input
    type="password"
    placeholder="Password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button onClick={handleRegister}>
    Create Admin
   </button>

   <p className="auth-switch">Đã có tài khoản? <a href="/admin-login">Đăng nhập Admin</a></p>
  </div>

 )

}