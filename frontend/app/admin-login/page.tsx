"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiUrl } from "@/lib/api-url"

export default function AdminLogin(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin = async ()=>{

  const res = await fetch(`${apiUrl}/api/auth/admin-login`,{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({email,password})

  })

  const data = await res.json()

  if(data.token){

   localStorage.setItem("adminToken",data.token)

   router.push("/admin")

  }else{

   alert("Login failed")

  }

 }

 return(

  <div className="auth-container">

   <h2>Admin Login</h2>

   <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

   <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

   <button onClick={handleLogin}>Login</button>

   <p className="auth-switch">Chưa có tài khoản? <a href="/admin-register">Tạo Admin</a></p>

  </div>

 )

}