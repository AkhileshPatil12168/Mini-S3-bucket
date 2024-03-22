import React from "react";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  // Mock data for demonstration
  const users = [
    { userId: 101, storageId: 654646, createdAt: "2022-03-15" },
    { userId: 102, storageId: 9879798, createdAt: "2022-03-16" },
    { userId: 102, storageId: 3123132, createdAt: "2022-03-16" },
    { userId: 102, storageId: 656464, createdAt: "2022-03-16" },
   

    // Add more user data here
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Users</h1>

        <div className="overflow-y-auto md:px-10 lg:px-20 xl:px-40">
          <table className="min-w-full divide-y divide-yellow-400">
            <thead className="bg-yellow-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Storage ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                 Account Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-black">
              {users.map((user, index) => (
                <tr key={index} className="text-white hover:bg-gray-600">
                 <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline  "> <Link to="/admin/user/:id">{user.userId}</Link></td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline"><Link to="/admin/storage/:id">{user.storageId}</Link></td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
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
