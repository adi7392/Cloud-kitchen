import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  const links = [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/kitchen", label: "Kitchen", icon: "🏪" },
    { to: "/admin/menu", label: "Menu", icon: "📋" },
    { to: "/admin/orders", label: "Orders", icon: "📦" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <aside className="w-56 bg-white shadow-sm border-r">
        <div className="p-4">
          <h2 className="text-lg font-bold text-orange-500 mb-4">
            Admin Panel
          </h2>
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`
                }
              >
                <span>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;