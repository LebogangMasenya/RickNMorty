import { NavLink } from "react-router";

export default function NavBar() {
  const linkStyles = ({ isActive }: { isActive: boolean }) => 
    `btn btn-ghost btn-sm rounded-btn ${isActive ? 'btn-active btn-primary text-white' : ''}`;

  return (
    <div className="navbar flex row bg-base-100 shadow-md px-4 sticky top-0 z-50">
      <div className="flex-1">
        <NavLink to="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
          RICK & MORTY
        </NavLink>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 gap-2">
          <li>
            <NavLink to="/" end className={linkStyles}>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}