import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import axios from "axios";
import { megaBytesConverter, timeConverter } from "../../../utils/utilityFunctions";

const AdminUserPage = () => {
  const { userId } = useParams();
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);
  const [user, setUser] = useState({
    userId: 101,
    StorageId: 5020,
    name: "John Doe",
    email: "john@example.com",
    dob: "1990-05-15",
    storageSize: "100 GB",
    usedSpace: "30 GB",
    totalBuckets: 5,
    buckets: [
      { bucketName: "Bucket 1", bucketId: 654987 },
      { bucketName: "Bucket 2", bucketId: 654987 },
      { bucketName: "Bucket 3", bucketId: 654987 },
      { bucketName: "Bucket 4", bucketId: 654987 },
      { bucketName: "Bucket 5", bucketId: 654987 },
    ],
  });

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        process.env.BACKENDAPI + `/admin/${whoLogedIn?.id}/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.data);
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (isLogedIn) getUserDetails();
  }, [isLogedIn]);

  return (
    <div className="bg-gray-900 text-yellow-400 min-h-screen p-4">
      <div className="container mx-auto py-8 md:px-10 lg:px-40 xl:px-72">
        <h1 className="text-3xl font-bold mb-8 text-center uppercase">User Details</h1>

        <div className="bg-gray-600 rounded-lg p-6 shadow-md text-white">
          <h2 className="text-xl font-semibold mb-4 text-center">{user?.userId?._id}</h2>
          <p className="text-lg font-semibold mb-2">
            Name:{" "}
            <span className="text-gray-300 font-normal">
              {user?.userId?.fname + " " + user?.userId?.lname}
            </span>
          </p>
          <p className="text-lg font-semibold mb-2 hover:bg-gray-500">
            Storage ID:{" "}
            <span className="text-gray-300 font-normal underline">
              <Link to={`/admin/storage/${user?._id}`}>{user?._id}</Link>
            </span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Email: <span className="text-gray-300 font-normal">{user?.userId?.email}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Date of Birth: <span className="text-gray-300 font-normal">{timeConverter(user?.userId?.dateOfBirth, "date")}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Storage Size: <span className="text-gray-300 font-normal">{megaBytesConverter(user?.storageSize)}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Used Space: <span className="text-gray-300 font-normal"> {megaBytesConverter(user?.usedSpace, "floor")}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Free Space: <span className="text-gray-300 font-normal"> {megaBytesConverter(user?.freeSpace, "ceil")}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Total Buckets: <span className="text-gray-300 font-normal"> {user?.totalBuckets}</span>
          </p>
        </div>

        <div className="mt-8 ">
          <h2 className="text-xl font-semibold mb-4 text-center uppercase">Buckets</h2>
          <div className="bg-gray-600 rounded-lg px-4 pt-2 shadow-md overflow-y-auto max-h-40 text-white">
            {user.buckets.map((bucket, index) => (
              <Link to={`/admin/bucket/${bucket?.bucketId?._id}`} key={index}>
                <div className="mb-2   border-b-2 border-gray-400 pl-2 hover:bg-gray-500 rounded-md">
                  <p className="text-lg font-semibold mb-2">
                    Bucket id:{" "}
                    <span className="text-gray-300 font-normal underline">
                      {bucket?.bucketId?._id}
                    </span>
                  </p>
                  <p className="text-lg mb-2">
                    Bucket Name:{" "}
                    <span className="text-gray-300 font-normal">
                      {bucket?.bucketId?.bucketName}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 cursor-pointer">
            Suspend Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
