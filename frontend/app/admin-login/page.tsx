"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiUrl } from "@/lib/api-url"
import { notifyAuthChanged } from "@/lib/auth-storage"

export default function AdminLogin(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin = async ()=>{

  try {
   const res = await fetch(`${apiUrl}/api/auth/admin-login`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({email,password})
   })

   const data = await res.json().catch(() => ({}))

   if(data.token){
    localStorage.setItem("adminToken",data.token)
    notifyAuthChanged()
    router.push("/admin")
    router.refresh()
    return
   }

   const msg = data.message || (res.ok ? "Không nhận được token" : `Lỗi ${res.status}`)
   alert(`Đăng nhập thất bại: ${msg}`)
  } catch (e) {
   console.error(e)
   alert(
    "Không kết nối được API. Kiểm tra NEXT_PUBLIC_API_URL trên Vercel và CORS_ORIGIN trên Render (phải có đúng domain Vercel, ví dụ https://cloud-project-henna.vercel.app)."
   )
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