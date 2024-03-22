import React from "react";
import { Link } from "react-router-dom";

const AllStoragePage = () => {
  // Mock data for demonstration
  const storages = [
    { storageId: 1, userId: 101, size: "100 GB", usedSize: "30 GB" },
    { storageId: 2, userId: 102, size: "150 GB", usedSize: "40 GB" },

    // Add more storage data here
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto py-8 md:px-10 lg:px-20 xl:px-40">
        <h1 className="text-3xl font-bold mb-8 text-center">Storages</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {storages.map((storage, index) => (
            <Link key={index} to="/admin/storage/:id">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-black">
                  Storage ID: {storage.storageId}
                </h2>
                <p className="text-gray-700">User ID: {storage.userId}</p>
                <p className="text-gray-700">Size: {storage.size}</p>
                <p className="text-gray-700">Used Size: {storage.usedSize}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 mr-2">
            Previous
          </button>
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 ml-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllStoragePage;
