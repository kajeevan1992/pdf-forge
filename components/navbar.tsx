import Link from "next/link";

export function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">PDF Forge</div>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}