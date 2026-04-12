import { Suspense } from "react"
import { CategoryProductList } from "@/components/CategoryProductList"

export default function HeadphonePage() {
  return (
    <Suspense fallback={<p className="category-page-loading">Đang tải…</p>}>
      <CategoryProductList
        categorySlug="headphone"
        title="Âm thanh"
        emoji="🎧"
      />
    </Suspense>
  )
}
