"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Product{
 id:number
 name:string
 price:number
 image:string
}

export default function Home(){

 const [products,setProducts] = useState<Product[]>([])

 useEffect(()=>{

  fetch("http://localhost:5000/api/products")
   .then(res=>res.json())
   .then(data=>setProducts(data))

 },[])

 return(

 <>
  <section className="intro">
   <h2>🛒 Giới thiệu về TTD Shop</h2>
   <p>
    TTD Shop chuyên cung cấp các sản phẩm công nghệ chính hãng như laptop,
    đồng hồ thông minh, tai nghe và phụ kiện điện tử.
   </p>
  </section>

  <section className="products">

   {products.map((p)=>(
    <div key={p.id} className="product-card">

     {p.image && (
      <Image
       src={`http://localhost:5000/uploads/${p.image}`}
       alt={p.name}
       width={150}
       height={150}
       unoptimized
      />
     )}

     <h3>{p.name}</h3>

     <p>{p.price.toLocaleString()}đ</p>

    </div>
   ))}

  </section>

 </>

 )

}