import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import { timeConverter } from "../../../utils/utilityFunctions";

const AdminUsersPage = () => {
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(process.env.BACKENDAPI + `/admin/${whoLogedIn?.id}/users`, {
        withCredentials: true,
      });
      console.log(response.data.data);
      setUsers(response?.data?.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    if (isLogedIn) getUsers();
  }, [isLogedIn]);
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Users</h1>

        <div className="overflow-y-auto md:px-10 lg:px-20 xl:px-40">
          <p>Total Users: {users.length}</p>
          <table className="min-w-full divide-y divide-yellow-400">
            <thead className="bg-yellow-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  User ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  Storage ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  Account Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-black">
              {users.map((user, index) => (
                <tr key={index} className="text-white hover:bg-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline  ">
                    {" "}
                    <Link to={`/admin/user/${user?.userId}`}>{user?.userId}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline">
                    <Link to={`/admin/storage/${user?._id}`}>{user?._id}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{timeConverter(user?.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
