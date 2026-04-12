"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { apiUrl } from "@/lib/api-url"

export default function EditProduct(){

 const router = useRouter()
 const params = useParams()
 const id = Array.isArray(params.id) ? params.id[0] : params.id

 const [name,setName] = useState("")
 const [price,setPrice] = useState("")
 const [category,setCategory] = useState("")
 const [brand,setBrand] = useState("")
 const [description,setDescription] = useState("")
 const [image,setImage] = useState<File | null>(null)
 const [savedImage,setSavedImage] = useState<string | null>(null)
 const [preview,setPreview] = useState("")

useEffect(()=>{
 fetch(`${apiUrl}/api/products/${id}`)
  .then(res=>res.json())
  .then(product=>{

   setName(product.name || "")
   setPrice(product.price?.toString() || "")
   setCategory(product.category || "")
   setBrand(product.brand || "")
   setDescription(product.description || "")
   setSavedImage(product.image || null)

   if(product.image){
    setPreview(`${apiUrl}/uploads/${product.image}`)
   }

  })

},[id])

 const handleUpdate = async()=>{

  const formData = new FormData()

  formData.append("name",name)
  formData.append("price",price)
  formData.append("category",category)
  formData.append("brand",brand)
  formData.append("description",description)

  if(image){
   formData.append("image",image)
  } else if (savedImage) {
   formData.append("image",savedImage)
  }

  await fetch(`${apiUrl}/api/products/${params.id}`,{

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
     unoptimized
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
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
    placeholder="Category"
   />

   <input
    value={brand}
    onChange={(e)=>setBrand(e.target.value)}
    placeholder="Brand"
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