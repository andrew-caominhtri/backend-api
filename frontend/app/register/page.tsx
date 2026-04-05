"use client"

import { useState } from "react"

export default function Register(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleRegister = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,{

      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password})

    })

    const data = await res.json()

    alert(data.message)

  }

  return(

    <div className="auth-container">

      <h2>Đăng ký tài khoản</h2>

      <input
        placeholder="Tên"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Đăng ký
      </button>

      <p className="auth-switch">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
      
    </div>

  )
}