"use client"

import { useRouter } from "next/navigation"

export default function AdminLayout({children}:{children:React.ReactNode}){

 const router = useRouter()

 return(

  <div className="admin-container">

   <aside className="sidebar">

    <h2>Admin</h2>

    <ul>

     <li onClick={()=>router.push("/admin")}>
      Dashboard
     </li>

     <li onClick={()=>router.push("/admin/add-product")}>
      Add Product
     </li>

     <li>
      Orders
     </li>

    </ul>

   </aside>

   <main className="admin-main">

    <div className="page-container">
     {children}
    </div>

   </main>

  </div>

 )

}