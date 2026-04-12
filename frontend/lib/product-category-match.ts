import type { Product } from "@/lib/product-types"

export type CategorySlug = "laptop" | "tablet" | "headphone" | "smartwatch"

export function productMatchesCategorySlug(
  p: Product,
  slug: CategorySlug
): boolean {
  const c = (p.category || "").toLowerCase()
  switch (slug) {
    case "laptop":
      return c.includes("laptop")
    case "tablet":
      return (
        c.includes("tablet") ||
        c.includes("máy tính bảng") ||
        c.includes("ipad")
      )
    case "headphone":
      return (
        c.includes("headphone") ||
        c.includes("tai nghe") ||
        c.includes("âm thanh") ||
        c.includes("audio") ||
        c.includes("loa")
      )
    case "smartwatch":
      return (
        c.includes("smartwatch") ||
        c.includes("đồng hồ") ||
        c.includes("watch")
      )
    default:
      return false
  }
}

export function brandMatchesParam(
  productBrand: string | null | undefined,
  param: string | null
): boolean {
  if (!param || !param.trim()) return true
  const a = (productBrand || "").trim().toLowerCase()
  const b = param.trim().toLowerCase()
  return a === b
}
