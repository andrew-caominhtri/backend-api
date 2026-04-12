import { Suspense } from "react"
import { CategoryProductList } from "@/components/CategoryProductList"

export default function LaptopPage() {
  return (
    <Suspense fallback={<p className="category-page-loading">Đang tải…</p>}>
      <CategoryProductList categorySlug="laptop" title="Laptop" emoji="💻" />
    </Suspense>
  )
}
