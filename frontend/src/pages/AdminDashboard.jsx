import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiUpload, FiBookOpen, FiUsers, FiLogOut, FiHelpCircle } from "react-icons/fi";

export default function AdminDashboard() {

  const location = useLocation();

  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      icon: <FiGrid size={18} />,
      path: "/admin/dashboard",
    },
    {
      name: "Upload Books",
      icon: <FiUpload size={18} />,
      path: "/admin/add-book",
    },
    {
      name: "Manage Books",
      icon: <FiBookOpen size={18} />,
      path: "/admin/books",
    },
    {
      name: "Users",
      icon: <FiUsers size={18} />,
      path: "/admin/users",
    },
  ];

  //LOGOUT FUNCTION

  const handleLogout = () => {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
  };

  return (

    <div className="flex min-h-screen bg-[#FAFAFA]">

      {/* SIDEBAR */}

      <div
        className="
          w-[260px]
          min-h-screen
          p-6
          space-y-6
        "
      >

        <h1 className="text-3xl font-bold text-[#18181B]">
          Admin
        </h1>

        <div className="flex flex-col gap-4 text-[#52525B]">

          {menus.map((menu, index) => (
            <Link
              key={index}
              to={menu.path}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition
                ${
                  location.pathname === menu.path
                    ? "bg-[#E0E7FF] text-[#27272A] font-medium"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {menu.icon}
              {menu.name}
            </Link>
          ))}

        </div>

        <div className="flex flex-col">

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3
              px-4
              rounded-xl
              text-[#52525B]
              hover:bg-gray-100
            "
          >
            <FiLogOut size={18} />
            Logout
          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-10 bg-[#F8F8FF]">
        <Outlet />
      </div>

    </div>
  );
}