import Link from "next/link";
export function Navbar() {
  return <nav><Link href="/">Home</Link> | <Link href="/dashboard">Dashboard</Link></nav>;
}