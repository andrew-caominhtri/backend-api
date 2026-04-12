import Link from "next/link"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TTD Shop</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <div className="store-top-bar">
          <div className="store-container store-top-bar-inner">
            <span>
              <i className="fa-solid fa-shield-halved" /> Hàng chính hãng · VAT đầy đủ
            </span>
            <span>
              <i className="fa-solid fa-truck-fast" /> Giao nhanh toàn quốc
            </span>
            <span>
              <i className="fa-solid fa-store" /> Hệ thống cửa hàng
            </span>
            <span>
              <i className="fa-solid fa-phone" /> Hotline:{" "}
              <strong>1900 1000</strong>
            </span>
          </div>
        </div>

        <header className="store-header">
          <div className="store-container store-header-main">
            <Link href="/" className="store-logo">
              TTD<span>Shop</span>
            </Link>

            <button type="button" className="store-cat-btn" aria-expanded="false">
              <i className="fa-solid fa-bars" />
              Danh mục
            </button>

            <div className="store-location">
              <i className="fa-solid fa-location-dot" />
              <span>Hồ Chí Minh</span>
            </div>

            <div className="store-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                id="store-search-input"
                type="search"
                name="q"
                placeholder="Bạn đang tìm sản phẩm gì?"
                autoComplete="off"
              />
            </div>

            <Link href="/" className="store-cart">
              <i className="fa-solid fa-cart-shopping" />
              <span className="store-cart-label">Giỏ hàng</span>
              <span className="store-cart-badge">0</span>
            </Link>

            <div className="account-menu">
              <div className="account-title">
                <i className="fa-regular fa-user" /> Tài khoản
              </div>
              <div className="account-dropdown">
                <Link href="/login">
                  <i className="fa-solid fa-user" /> Khách hàng
                </Link>
                <Link href="/admin-login">
                  <i className="fa-solid fa-user-tie" /> Admin
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="store-main">{children}</main>

        <footer className="store-footer">
          <div className="store-container store-footer-grid">
            <div>
              <strong>TTD Shop</strong>
              <p>Thiết bị công nghệ chính hãng, bảo hành uy tín.</p>
            </div>
            <div>
              <strong>Hỗ trợ</strong>
              <p>Hotline: 1900 1000</p>
              <p>Email: support@ttdshop.vn</p>
            </div>
            <div>
              <strong>Chính sách</strong>
              <p>Mua hàng · Đổi trả · Bảo hành</p>
            </div>
          </div>
          <div className="store-footer-copy">
            © {new Date().getFullYear()} TTD Shop · Thiết kế nhóm TTD
          </div>
        </footer>
      </body>
    </html>
  )
}
