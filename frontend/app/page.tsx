"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { apiUrl } from "@/lib/api-url"
import type { Product } from "@/lib/product-types"
import { CategoryMegaSidebar } from "@/components/CategoryMegaSidebar"

const HERO_SLIDES = [
  {
    title: "Laptop gaming — Hiệu năng bứt phá",
    sub: "Trả góp 0% · Giao trong 2h nội thành",
    tone: "slide-a",
  },
  {
    title: "Tai nghe & loa — Âm thanh chuẩn studio",
    sub: "Giảm đến 30% cho thành viên mới",
    tone: "slide-b",
  },
  {
    title: "Đồng hồ thông minh — Sống khỏe mỗi ngày",
    sub: "Tặng dây đeo khi mua cùng máy",
    tone: "slide-c",
  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [heroIndex, setHeroIndex] = useState(0)
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  useEffect(() => {
    const t = setInterval(
      () => setHeroIndex((i) => (i + 1) % HERO_SLIDES.length),
      5000
    )
    return () => clearInterval(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    )
  }, [products, query])

  useEffect(() => {
    const el = document.getElementById(
      "store-search-input"
    ) as HTMLInputElement | null
    if (!el) return
    const onInput = () => setQuery(el.value)
    el.addEventListener("input", onInput)
    return () => el.removeEventListener("input", onInput)
  }, [])

  return (
    <div className="home-store">
      <div className="store-container home-columns">
        <CategoryMegaSidebar />

        <div className="home-center">
          <section className="hero-slider" aria-label="Khuyến mãi nổi bật">
            {HERO_SLIDES.map((s, i) => (
              <div
                key={s.title}
                className={`hero-slide ${s.tone} ${i === heroIndex ? "active" : ""}`}
              >
                <div className="hero-slide-text">
                  <h2>{s.title}</h2>
                  <p>{s.sub}</p>
                  <Link href="/" className="hero-cta">
                    Mua ngay
                  </Link>
                </div>
              </div>
            ))}
            <div className="hero-dots">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === heroIndex ? "on" : ""}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setHeroIndex(i)}
                />
              ))}
            </div>
          </section>

          <div className="promo-tiles">
            <Link href="/laptop" className="promo-tile tile-1">
              <span>Laptop văn phòng</span>
              <small>Giá tốt mỗi ngày</small>
            </Link>
            <Link href="/headphone" className="promo-tile tile-2">
              <span>Tai nghe không dây</span>
              <small>Chống ồn chủ động</small>
            </Link>
            <Link href="/smartwatch" className="promo-tile tile-3">
              <span>Smartwatch</span>
              <small>Theo dõi sức khỏe 24/7</small>
            </Link>
          </div>

          <section className="intro-store">
            <h2>
              <i className="fa-solid fa-store" /> TTD Shop
            </h2>
            <p>
              Chuyên laptop, đồng hồ thông minh, tai nghe và phụ kiện công
              nghệ chính hãng — giao nhanh, hỗ trợ tận tâm.
            </p>
          </section>

          <div className="section-bar">
            <h3>
              <i className="fa-solid fa-bolt" /> Gợi ý cho bạn
            </h3>
            <span className="section-bar-meta">
              {filtered.length} sản phẩm
              {query ? ` · “${query}”` : ""}
            </span>
          </div>

          <section className="products-store">
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
                <button type="button" className="product-card-btn">
                  Xem nhanh
                </button>
              </article>
            ))}
          </section>

          {filtered.length === 0 ? (
            <p className="empty-products">Không tìm thấy sản phẩm phù hợp.</p>
          ) : null}
        </div>

        <aside className="promo-aside" aria-label="Ưu đãi">
          <div className="promo-box promo-welcome">
            <strong>Xin chào!</strong>
            <p>Đăng nhập để tích điểm và nhận ưu đãi riêng.</p>
            <Link href="/login" className="promo-link-btn">
              Đăng nhập
            </Link>
          </div>
          <div className="promo-box">
            <div className="promo-box-title">
              <i className="fa-solid fa-graduation-cap" /> Ưu đãi sinh viên
            </div>
            <p>Giảm thêm khi xác minh thẻ học sinh — sinh viên.</p>
          </div>
          <div className="promo-box">
            <div className="promo-box-title">
              <i className="fa-solid fa-rotate" /> Thu cũ đổi mới
            </div>
            <p>Hỗ trợ lên đời thiết bị với giá tốt nhất.</p>
          </div>
          <div className="promo-box promo-hot">
            <span>Flash sale cuối tuần</span>
            <strong>Giảm đến 50%</strong>
            <small>Một số nhóm hàng — số lượng có hạn</small>
          </div>
          <a href="tel:19001000" className="promo-contact">
            <i className="fa-solid fa-headset" />
            <span>Tư vấn miễn phí</span>
            <strong>1900 1000</strong>
          </a>
        </aside>
      </div>
    </div>
  )
}
