"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiUrl } from "@/lib/api-url"

export default function Login(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin = async ()=>{

  const res = await fetch(`${apiUrl}/auth/login`,{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    email,
    password
   })

  })

  const data = await res.json()

  if(data.token){

   localStorage.setItem("token",data.token)

   alert("Login success")

   router.push("/")

  }else{

   alert("Login failed")

  }

 }

 return(

  <div className="auth-container">

   <h2>Đăng nhập</h2>

   <input
    placeholder="Email"
    onChange={(e)=>setEmail(e.target.value)}
   />

   <input
    type="password"
    placeholder="Password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button onClick={handleLogin}>
    Login
   </button>

   <p className="auth-switch">Chưa có tài khoản? <a href="/register">Tạo tài khoản</a></p>
   
  </div>

 )

}