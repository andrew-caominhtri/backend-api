"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"

export default function EditProduct(){

 const router = useRouter()
 const params = useParams()
 const id = Array.isArray(params.id) ? params.id[0] : params.id

 const [name,setName] = useState("")
 const [price,setPrice] = useState("")
 const [description,setDescription] = useState("")
 const [image,setImage] = useState<File | null>(null)
 const [preview,setPreview] = useState("")

useEffect(()=>{

 fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
  .then(res=>res.json())
  .then(product=>{

   setName(product.name || "")
   setPrice(product.price?.toString() || "")
   setDescription(product.description || "")

   if(product.image){
    setPreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`)
   }

  })

},[id])

 const handleUpdate = async()=>{

  const formData = new FormData()

  formData.append("name",name)
  formData.append("price",price)
  formData.append("description",description)

  if(image){
   formData.append("image",image)
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`,{

   method:"PUT",
   body:formData

  })

  alert("Product updated")

  router.push("/admin")

 }

 useEffect(()=>{

  return ()=>{

   if(preview.startsWith("blob:")){
    URL.revokeObjectURL(preview)
   }

  }

 },[preview])

 return(

 <div className="admin-form-container">

  <div className="admin-form-card">

   <h2>Update Product</h2>

   {preview && (
    <Image
     src={preview}
     alt="Product preview"
     className="preview-image"
     width={200}
     height={200}
    />
   )}

   <input
    value={name}
    onChange={(e)=>setName(e.target.value)}
    placeholder="Product name"
   />

   <input
    value={price}
    onChange={(e)=>setPrice(e.target.value)}
    placeholder="Price"
   />

   <input
    type="file"
    onChange={(e)=>{

     const file = e.target.files?.[0]

     if(file){

      setImage(file)

      setPreview(URL.createObjectURL(file))

     }

    }}
   />

   <textarea
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    placeholder="Description"
   />

   <div className="form-buttons">

    <button className="add-btn" onClick={handleUpdate}>
      Update
    </button>

    <button
     className="cancel-btn"
     onClick={()=>router.push("/admin")}
    >
      Cancel
    </button>

   </div>

  </div>

 </div>

 )

}