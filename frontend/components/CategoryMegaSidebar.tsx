"use client"

import Link from "next/link"
import { MEGA_CATEGORIES } from "@/lib/category-brands"

export function CategoryMegaSidebar() {
  return (
    <aside
      className="category-aside category-aside--mega"
      aria-label="Danh mục"
    >
      <div className="category-aside-title">Danh mục sản phẩm</div>
      <ul className="category-mega-list">
        {MEGA_CATEGORIES.map((cat) => (
          <li
            key={cat.id}
            className={`category-mega-item${cat.muted ? " category-mega-item--muted" : ""}`}
          >
            <Link
              href={cat.href}
              className={cat.muted ? "cat-muted" : undefined}
            >
              <i className={`fa-solid ${cat.icon}`} />
              <span>{cat.label}</span>
              <i className="fa-solid fa-chevron-right cat-arrow" />
            </Link>

            {!cat.muted && cat.brands.length > 0 ? (
              <div
                className="category-mega-flyout"
                role="region"
                aria-label={`${cat.label} — chọn thương hiệu`}
              >
                <h4 className="category-mega-flyout-title">{cat.sectionTitle}</h4>
                <div className="brand-grid">
                  {cat.brands.map((b) => (
                    <Link
                      key={b.brandParam}
                      href={`${cat.href}?brand=${encodeURIComponent(b.brandParam)}`}
                      className="brand-tile"
                    >
                      {b.badge ? (
                        <span className="brand-tile-badge">{b.badge}</span>
                      ) : null}
                      <span className="brand-tile-name">{b.name}</span>
                    </Link>
                  ))}
                </div>
                <Link href={cat.href} className="category-mega-view-all">
                  Xem tất cả {cat.label.toLowerCase()}
                  <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  )
}
