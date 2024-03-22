import React from "react";
import { Link } from "react-router-dom";

const AdminStoragePage = () => {
  // Mock data for demonstration
  const storageData = {
    userId: "123",
    storageSize: "100 GB",
    usedSpace: "30 GB",
    freeSpace: "70 GB",
    totalBuckets: 5,
    totalObjects: 50,
    buckets: [
      { name: "Bucket 1", createdAt: "2024-03-20", updatedAt: "2024-03-21" },
      { name: "Bucket 2", createdAt: "2024-03-22", updatedAt: "2024-03-23" },
      { name: "Bucket 2", createdAt: "2024-03-22", updatedAt: "2024-03-23" },
      { name: "Bucket 2", createdAt: "2024-03-22", updatedAt: "2024-03-23" },
      

      // Add more buckets here
    ],
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center p-4 ">
      <div className="container mx-auto py-8 md:px-10 lg:px-20 xl:px-40">
        <h1 className="text-3xl font-bold mb-8 text-center">Storage : storageId</h1>

        <div className="bg-gray-400 rounded-lg p-6 shadow-md ">
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-4 text-yellow-400">User ID: {storageData.userId}</p>
            <p className="text-white">Storage Size: {storageData.storageSize}</p>
            <p className="text-white">Used Space: {storageData.usedSpace}</p>
            <p className="text-white">Free Space: {storageData.freeSpace}</p>
            <p className="text-white">Total Buckets: {storageData.totalBuckets}</p>
            <p className="text-white">Total Objects: {storageData.totalObjects}</p>
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-4 text-black uppercase text-center">Buckets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storageData.buckets.map((bucket, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4">
                <Link to="/admin/bucket/:id"><h3 className="text-lg font-semibold mb-2 text-yellow-400">{bucket.name}</h3></Link>
                <p className="text-white">Created At: {bucket.createdAt}</p>
                <p className="text-white">Updated At: {bucket.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStoragePage;
