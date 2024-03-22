import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
  // Mock data for demonstration
  const recentUsers = [
    { userId: 1, userName: "User 1", email: "user1@example.com" },
    { userId: 2, userName: "User 2", email: "user2@example.com" },
    { userId: 2, userName: "User 2", email: "user2@example.com" },
    { userId: 2, userName: "User 2", email: "user2@example.com" },

    // Add more recent users here
  ];

  const storageData = [
    { userId: 1, userName: "User 1", storageAllocated: "50 GB" },
    { userId: 2, userName: "User 2", storageAllocated: "100 GB" },
    { userId: 2, userName: "User 2", storageAllocated: "100 GB" },
    { userId: 2, userName: "User 2", storageAllocated: "100 GB" },

    // Add more storage data here
  ];

  const recentRequests = [
    { name: "John Doe", email: "john@example.com", message: "Request message 1" },
    { name: "Jane Doe", email: "jane@example.com", message: "Request message 2" },
    { name: "Jane Doe", email: "jane@example.com", message: "Request message 2" },
    { name: "Jane Doe", email: "jane@example.com", message: "Request message 2" },

    // Add more recent requests here
  ];

  const recentBuckets = [
    { userId: 1, bucketName: "Bucket 1" },
    { userId: 2, bucketName: "Bucket 2" },
    { userId: 2, bucketName: "Bucket 2" },
    { userId: 2, bucketName: "Bucket 2" },

    // Add more recent buckets here
  ];

  const recentUploadedObjects = [
    { objectId: 1, objectSize: "5 MB" },
    { objectId: 2, objectSize: "2 MB" },
    { objectId: 2, objectSize: "2 MB" },
    { objectId: 2, objectSize: "2 MB" },

    // Add more recent uploaded objects here
  ];

  return (
    <div className="bg-gray-900  min-h-screen px-4  ">
      <div className="container mx-auto py-8 flex-grow ">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <div className=" flex justify-center">
          <button
            onClick={() => navigate("/admin/create/admin")}
            className="text-xl font-semibold mb-4 sticky top-0  text-center text-white bg-green-500 p-4 rounded-md hover:bg-green-600"
          >
            Create New Admin
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8   ">
          <div className="bg-gray-600 rounded-lg shadow-md overflow-y-auto max-h-60 ">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Server Information
            </h2>
            <div className="mb-4 pl-4 text-lg   ">
              <p className="">Server Used Storage : </p>
              <p className="">Overall Users : </p>
              <p className="">Total Buckets : </p>
              <p className="">Total objects : </p>
            </div>
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Storage Data
            </h2>

            {storageData.map((data) => (
              <div key={data.userId} className="mb-4 pl-4 ">
                <p>User ID: {data.userId}</p>
                <p>Storage Allocated: {data.storageAllocated}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg shadow-md overflow-y-auto max-h-60 ">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Users
            </h2>

            {recentUsers.map((user) => (
              <div key={user.userId} className="mb-4 pl-4  ">
                <p>User ID: {user.userId}</p>
                <p>User Name: {user.userName}</p>
                <p>Email: {user.email}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Requests
            </h2>

            {recentRequests.map((request, index) => (
              <div key={index} className="mb-4 pl-4 ">
                <p>Name: {request.name}</p>
                <p>Email: {request.email}</p>
                <p>Message: {request.message}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Buckets
            </h2>

            {recentBuckets.map((bucket, index) => (
              <div key={index} className="mb-4 pl-4 ">
                <p>User ID: {bucket.userId}</p>
                <p>Bucket Name: {bucket.bucketName}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto min-h-40 max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Uploaded Objects
            </h2>

            {recentUploadedObjects.map((object, index) => (
              <div key={index} className="mb-4 pl-4 ">
                <p>Object ID: {object.objectId}</p>
                <p>Object Size: {object.objectSize}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
