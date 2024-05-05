import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import { megaBytesConverter, timeConverter } from "../../../utils/utilityFunctions";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);

  const [data, setData] = useState({});

  const getSummery = async () => {
    try {
      const response = await axios.get(
        process.env.BACKENDAPI + `/admin/${whoLogedIn?.id}/serverinfo/v1`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummery();
  }, []);

  return (
    <div className="bg-gray-900  min-h-screen">
      <div className="container mx-auto flex-grow ">
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
              <p className="">
                Total Allocated Storage:{" "}
                {megaBytesConverter(data?.server?.OverAllStorageAllocated, "GB")} GB
              </p>
              <p className="">
                Total Used Storage : {megaBytesConverter(data?.server?.OverAllStorageUsed, "ceil")}{" "}
                MB
              </p>
              <p className="">Overall Users : {data?.server?.overAllUsers}</p>
              <p className="">Total Buckets : {data?.server?.overAllBuckets}</p>
              <p className="">Total objects : {data?.server?.overAllObjects}</p>
            </div>
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Server Errors
            </h2>

            {data?.serverErrors?.map((data, index) => (
              <Link to={`/admin/server/error/${data?._id}`}>
                <div key={index} className=" pl-4 py-2 border-b-2 hover:bg-slate-700">
                  <p>Error ID: {data?._id}</p>
                  <p>Error Time: {timeConverter(data?.createdAt)}</p>
                  <p>Error Type: {data?.errorType[0]} </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Storage Data
            </h2>

            {data?.storages?.map((data) => (
              <div key={data.userId} className="mt-2 pl-4 pb-2 border-b-2">
                <p>User ID: {data.userId}</p>
                <p>Storage Allocated: {megaBytesConverter(data?.storageSize)} MB</p>
                <p>Used: {megaBytesConverter(data.usedSpace, "ceil")} MB</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg shadow-md overflow-y-auto max-h-60 ">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Users
            </h2>

            {data?.users?.map((user, index) => (
              <Link to={`/admin/user/${user?._id}`}>
                <div key={index} className="p-2 pl-4 pb-2 border-b-2 hover:bg-gray-700">
                  <p>User ID: {user._id}</p>
                  <p>User Name: {user?.fname + " " + user?.lname}</p>
                  <p>Email: {user?.email}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Requests
            </h2>

            {data?.requests?.map((request, index) => (
              <div key={index} className="mt-2 pl-4 pb-2 border-b-2">
                <p>Name: {request?.name}</p>
                <p>Email: {request?.email}</p>
                <p>Subject: {request?.subject}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto max-h-60">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Buckets
            </h2>

            {data?.buckets?.map((bucket, index) => (
              <div key={index} className="mt-2 pl-4 pb-2 border-b-2">
                <p>User ID: {bucket?.userId}</p>
                <p>Bucket Name: {bucket?.bucketName}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-600  rounded-lg  shadow-md overflow-y-auto min-h-40 max-h-60 hidden">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-yellow-400 text-center ">
              Recent Uploaded Objects
            </h2>

            {data?.objects?.map((object, index) => (
              <div key={index} className="mt-2 pl-4 pb-2 border-b-2">
                <p>Object ID: {object?._id}</p>
                <p>Object Size: {megaBytesConverter(object?.objectSize, "ceil")} MB</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
