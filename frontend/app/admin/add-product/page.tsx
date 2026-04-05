"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddProduct(){

 const router = useRouter()

 const [name,setName] = useState("")
 const [price,setPrice] = useState("")
 const [image,setImage] = useState<File | null>(null)
 const [description,setDescription] = useState("")

 const handleAdd = async ()=>{

  const formData = new FormData()

  formData.append("name",name)
  formData.append("price",price)
  formData.append("description",description)

  if(image){
   formData.append("image",image)
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,{

   method:"POST",
   body:formData

  })

  alert("Product added")

  router.push("/admin")

 }

 return(

 <div className="admin-form-card">

  <h2>Add New Product</h2>

  <input
   placeholder="Product Name"
   onChange={(e)=>setName(e.target.value)}
  />

  <input
   placeholder="Price"
   onChange={(e)=>setPrice(e.target.value)}
  />

  <input
   type="file"
   onChange={(e)=>setImage(e.target.files?.[0] || null)}
  />

  <textarea
   placeholder="Description"
   onChange={(e)=>setDescription(e.target.value)}
  />

  <div className="form-buttons">

   <button className="add-btn" onClick={handleAdd}>
    Add Product
   </button>

   <button
    className="cancel-btn"
    onClick={()=>router.push("/admin")}
   >
    Cancel
   </button>

  </div>

 </div>

 )
}