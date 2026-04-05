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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>

        <header className="header">
          <div className="logo">
            <Link href="/">TTD Shop</Link>
          </div>

          <div className="search-box">
            <span className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            {/* <button></button> */}
          </div>

          <div className="account-menu">
            <div className="account-title">
              Tài khoản
            </div>
            <div className="account-dropdown">
              <Link href="./login"><i className="fa-solid fa-user"></i> Khách hàng</Link>
              <Link href="./admin-login"><i className="fa-solid fa-user-tie"></i> Admin</Link>
            </div>
          </div>
        </header>

        <nav>
          <Link href="/smartwatch"><i className="fa-solid fa-clock"></i> Đồng hồ thông minh</Link>
          <Link href="/laptop"><i className="fa-solid fa-laptop"></i> Laptop</Link>
          <Link href="/headphone"><i className="fa-solid fa-headphones"></i> Tai nghe</Link>
          <Link href="/tablet"><i className="fa-solid fa-tablet"></i> Máy tính bảng</Link>
        </nav>

        <main>
          {children}
        </main>

        <footer>
          © 2025 TTD Shop | Thiết kế bởi nhóm TTD | Hotline: 1900 1000
        </footer>
        
      </body>
    </html>
  );
}