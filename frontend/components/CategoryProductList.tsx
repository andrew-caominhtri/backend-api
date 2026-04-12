"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { apiUrl } from "@/lib/api-url"
import type { Product } from "@/lib/product-types"
import type { CategorySlug } from "@/lib/product-category-match"
import {
  brandMatchesParam,
  productMatchesCategorySlug,
} from "@/lib/product-category-match"

type Props = {
  categorySlug: CategorySlug
  title: string
  emoji?: string
}

export function CategoryProductList({ categorySlug, title, emoji }: Props) {
  const searchParams = useSearchParams()
  const brandFilter = searchParams.get("brand")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        productMatchesCategorySlug(p, categorySlug) &&
        brandMatchesParam(p.brand, brandFilter)
    )
  }, [products, categorySlug, brandFilter])

  return (
    <div className="category-page">
      <section className="category-page-header">
        <h2>
          {emoji ? `${emoji} ` : null}
          {title}
          {brandFilter ? (
            <span className="category-page-brand">
              {" "}
              · Thương hiệu: <strong>{brandFilter}</strong>
            </span>
          ) : null}
        </h2>
        <p className="category-page-meta">
          {filtered.length} sản phẩm
          {brandFilter ? "" : " trong danh mục"}
        </p>
        {brandFilter ? (
          <Link href={`/${categorySlug}`} className="category-page-clear">
            Bỏ lọc thương hiệu
          </Link>
        ) : null}
      </section>

      <section className="products-store category-page-grid">
        {filtered.map((p) => (
          <article key={p.id} className="product-card-store">
            <div className="product-card-img">
              {p.image ? (
                <Image
                  src={`${apiUrl}/uploads/${p.image}`}
                  alt={p.name}
                  width={200}
                  height={200}
                  unoptimized
                />
              ) : (
                <div className="product-card-placeholder">
                  <i className="fa-solid fa-image" />
                </div>
              )}
              {p.category ? (
                <span className="product-badge">{p.category}</span>
              ) : null}
            </div>
            {p.brand ? (
              <p className="product-card-brand">{p.brand}</p>
            ) : null}
            <h3 className="product-card-name">{p.name}</h3>
            <p className="product-card-price">
              {p.price.toLocaleString("vi-VN")}
              <span>đ</span>
            </p>
            <Link href="/" className="product-card-btn-link">
              Xem tại trang chủ
            </Link>
          </article>
        ))}
      </section>

      {filtered.length === 0 ? (
        <p className="empty-products">
          Chưa có sản phẩm phù hợp.
          {brandFilter
            ? " Thử chọn thương hiệu khác hoặc thêm dữ liệu trong admin."
            : ""}
        </p>
      ) : null}
    </div>
  )
}
