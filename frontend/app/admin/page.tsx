"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Product {
 id: number
 name: string
 price: number
 image: string
}

export default function AdminDashboard(){

 const router = useRouter()

 const [products,setProducts] = useState<Product[]>([])
 const [preview,setPreview] = useState("")

 useEffect(()=>{

  const token = localStorage.getItem("adminToken")

  if(!token){
   router.push("/admin-login")
   return
  }

  https://microservices-project-5n0y.onrender.com
   .then(res=>res.json())
   .then(data=>setProducts(data))

 },[router])

 const handleDelete = async(id:number)=>{

  const confirmDelete = confirm("Delete product?")

  if(!confirmDelete) return

  await fetch(`http://localhost:5000/api/products/${id}`,{
   method:"DELETE"
  })

  setProducts(products.filter((p)=>p.id!==id))

 }

 return(

<div className="admin-container">

 <main className="admin-main">

  <h1>Admin Dashboard</h1>

  <div className="stats">

   <div className="card">
     <h3>{products.length}</h3>
     <p>Products</p>
   </div>

   <div className="card">
     <h3>0</h3>
     <p>Orders</p>
   </div>

   <div className="card">
     <h3>$0</h3>
     <p>Revenue</p>
   </div>

  </div>

  <h2>Product List</h2>

  <table className="admin-table">

   <thead>
    <tr>
     <th>ID</th>
     <th>Name</th>
     <th>Price</th>
     <th>Image</th>
     <th>Action</th>
    </tr>
   </thead>

   <tbody>

   {products.map((p)=>(
    <tr key={p.id}>

     <td>{p.id}</td>
     <td>{p.name}</td>
     <td>{p.price.toLocaleString()}₫</td>

     <td>

      {p.image && (

       <Image
        src={`http://localhost:5000/uploads/${p.image}`}
        alt={p.name}
        width={80}
        height={60}
        className="product-thumb"
        unoptimized
        onClick={() =>
         setPreview(`http://localhost:5000/uploads/${p.image}`)
        }
       />

      )}

     </td>

     <td>

      <button
       className="edit-btn"
       onClick={()=>router.push(`/admin/edit-product/${p.id}`)}
      >
       Edit
      </button>

      <button
       className="delete-btn"
       onClick={()=>handleDelete(p.id)}
      >
       Delete
      </button>

     </td>

    </tr>
   ))}

   </tbody>

  </table>

 </main>

 {/* modal preview ảnh */}

 {preview && (

  <div
   className="image-modal"
   onClick={()=>setPreview("")}
  >

   <Image
    src={preview}
    alt="Product preview"
    width={800}
    height={600}
    className="modal-image"
    unoptimized
   />

  </div>

 )}

</div>

 )
}