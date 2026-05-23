import { useEffect, useState } from "react";
import axios from "axios";

import { FiSearch, FiTrash2 } from "react-icons/fi";

export default function AdminUsers() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {
      const res = await axios.get(
        `${API_URL}/users`
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* TOP */}

      <div
        className="
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-8
        "
      >

        <h1 className="text-2xl sm:text-3xl font-bold">
          Users
        </h1>

        {/* SEARCH */}

        <div
          className="
            flex items-center
            bg-white
            border
            rounded-xl
            px-4
            h-[45px]
            w-full sm:w-[320px]
          "
        >

          <FiSearch className="text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              outline-none
              bg-transparent
            "
          />

        </div>

      </div>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto
          bg-white
          border
          rounded-2xl
          shadow-sm
        "
      >

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-5 font-bold">
                S.N.
              </th>

              <th className="p-5 font-bold">
                User
              </th>

              <th className="p-5 font-bold">
                Email
              </th>

              <th className="p-5 font-bold">
                Wishlist
              </th>

              <th className="p-5 font-bold">
                Cart
              </th>

              <th className="p-5 font-bold">
                Joined
              </th>

              <th className="p-5 font-bold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user, index) => (

              <tr
                key={user._id}
                className={`
                  border-t
                  transition
                  ${
                    search && (
                      user.name?.toLowerCase().includes(search.toLowerCase()) ||
                      user.email?.toLowerCase().includes(search.toLowerCase())
                    )
                    ? "bg-gray-300"
                    : "hover:bg-gray-50"
                  }
                `}
              >

                <td className="p-5">
                  {index + 1}
                </td>

                {/* USER */}

                <td className="p-5">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-[45px]
                        h-[45px]
                        rounded-full
                        bg-[#E0E7FF]
                        flex items-center justify-center
                        font-bold
                        text-[#4F46E5]
                      "
                    >
                      {user.name?.charAt(0)}
                    </div>

                    <div>

                      <h2 className="font-medium">
                        {user.name}
                      </h2>

                    </div>

                  </div>

                </td>

                <td className="p-5">
                  {user.email}
                </td>

                <td className="p-5">
                  {user.wishlistCount}
                </td>

                <td className="p-5">
                  {user.cartCount}
                </td>

                <td className="p-5">

                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="p-5">

                  <button
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      bg-red-100
                      text-red-600
                      rounded-lg
                      hover:bg-red-200
                      transition
                    "
                  >
                     Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}