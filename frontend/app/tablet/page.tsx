import { Suspense } from "react"
import { CategoryProductList } from "@/components/CategoryProductList"

export default function TabletPage() {
  return (
    <Suspense fallback={<p className="category-page-loading">Đang tải…</p>}>
      <CategoryProductList
        categorySlug="tablet"
        title="Máy tính bảng"
        emoji="📱"
      />
    </Suspense>
  )
}
