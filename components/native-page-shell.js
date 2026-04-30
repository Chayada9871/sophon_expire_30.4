const quickLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/products", label: "Products" },
  { href: "/stock-in", label: "Stock In" },
  { href: "/stock-out", label: "Stock Out" },
  { href: "/batches", label: "Batches" },
  { href: "/expire-returns", label: "Expire Returns" },
  { href: "/expired-history", label: "Expired History" },
  { href: "/damaged-manage", label: "Damaged Manage" },
  { href: "/analysis-expire-damage", label: "Analysis" }
];

export default function NativePageShell({ title, description, currentPath, children }) {
  return (
    <div className="native-layout">
      <aside className="native-sidebar">
        <div className="sidebar-brand">
          <img src="/images/logo.png" alt="Sophon" />
        </div>
        <div className="sidebar-title">Menu</div>
        {quickLinks.map((item) => (
          <a key={item.href} href={item.href} className={`sidebar-link${item.href === currentPath ? " active" : ""}`}>
            {item.label}
          </a>
        ))}
      </aside>
      <main className="native-page">
        <div className="native-panel">
          <div className="page-topbar">
            <div className="page-title">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <a className="secondary-button" href="/dashboard">Back to dashboard</a>
          </div>
          <div className="native-content">{children}</div>
        </div>
      </main>
    </div>
  );
}
