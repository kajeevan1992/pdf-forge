import Link from "next/link";

export function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <div className="brand-mark">PF</div>
          <div className="brand-text">
            <div className="brand-title">PDF Forge</div>
            <div className="brand-subtitle">Print workflow platform</div>
          </div>
        </div>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
