import { Outlet } from "react-router";
import NavBar from "./NavBar";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}