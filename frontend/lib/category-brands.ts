export type BrandItem = {
  name: string
  /** Query ?brand=... (khớp không phân biệt hoa thường với trường brand trong DB) */
  brandParam: string
  badge?: string
}

export type MegaCategoryItem = {
  id: string
  label: string
  icon: string
  href: string
  sectionTitle: string
  brands: BrandItem[]
  /** Không mở panel thương hiệu */
  muted?: boolean
}

export const MEGA_CATEGORIES: MegaCategoryItem[] = [
  {
    id: "laptop",
    label: "Laptop",
    icon: "fa-laptop",
    href: "/laptop",
    sectionTitle: "Thương hiệu Laptop",
    brands: [
      { name: "Asus", brandParam: "Asus" },
      { name: "Acer", brandParam: "Acer" },
      { name: "Dell", brandParam: "Dell" },
      { name: "Lenovo", brandParam: "Lenovo" },
    ],
  },
  {
    id: "tablet",
    label: "Máy tính bảng",
    icon: "fa-tablet-screen-button",
    href: "/tablet",
    sectionTitle: "Thương hiệu máy tính bảng",
    brands: [
      { name: "Apple", brandParam: "Apple" },
      { name: "Samsung", brandParam: "Samsung" },
      { name: "Xiaomi", brandParam: "Xiaomi" },
      { name: "Lenovo", brandParam: "Lenovo" },
    ],
  },
  {
    id: "headphone",
    label: "Âm thanh",
    icon: "fa-headphones",
    href: "/headphone",
    sectionTitle: "Thương hiệu âm thanh",
    brands: [
      { name: "Apple", brandParam: "Apple" },
      { name: "Samsung", brandParam: "Samsung" },
      { name: "Sony", brandParam: "Sony" },
      { name: "Soundpeats", brandParam: "Soundpeats" },
    ],
  },
  {
    id: "smartwatch",
    label: "Đồng hồ thông minh",
    icon: "fa-clock",
    href: "/smartwatch",
    sectionTitle: "Thương hiệu đồng hồ thông minh",
    brands: [
      { name: "Apple", brandParam: "Apple" },
      { name: "Samsung", brandParam: "Samsung" },
      { name: "Garmin", brandParam: "Garmin" },
      { name: "Huawei", brandParam: "Huawei" },
    ],
  },
  {
    id: "accessory",
    label: "Phụ kiện",
    icon: "fa-plug",
    href: "/",
    sectionTitle: "",
    brands: [],
    muted: true,
  },
  {
    id: "promo",
    label: "Khuyến mãi HOT",
    icon: "fa-tags",
    href: "/",
    sectionTitle: "",
    brands: [],
    muted: true,
  },
]
