import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/loginContext";
import axios from "axios";
import { Link } from "react-router-dom";

const UserHomePage = () => {
  const {isLogedIn, whoLogedIn } = useContext(LoginContext);

  const [info, setInfo] = useState({});
  const [recentObjects, setRecentObjects] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        process.env.BACKENDAPI + `/user/${whoLogedIn?.id}/storageinfo/v1`,
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.data);
      setInfo(response?.data?.data?.storageInfo);
      setRecentObjects(response?.data?.data?.recentObjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(isLogedIn)
    getData();
  }, [isLogedIn]);
  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Buckets</h2>
        {console.log(info, recentObjects, process.env.SERVER)}
        <div className="overflow-x-auto max-w-full">
          <div className="flex mb-4">
            {info?.buckets?.map((bucket, id) => (
              <Link to={`/bucket/${bucket?.bucketId?._id}`}  key={id}>
                {console.log(bucket)}
                <div
                  className="bg-gray-200 rounded-lg p-6 shadow-md flex-shrink-0 mr-6 hover:bg-white w-fit min-w-48 "
                 
                >
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {bucket?.bucketId?.bucketName}
                  </h3>
                  <p className="text-gray-700">
                    Bucket Size: {Math.ceil(bucket?.bucketId?.bucketSize / (1024 * 1024))} MB
                  </p>
                  <p className="text-gray-700">Total Objects: {bucket?.bucketId?.totalObjects}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Storage</h2>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-700">Storage Size: {info?.storageSize / (1024 * 1024)} MB</p>
          <p className="text-gray-700">
            Used Space: {Math.ceil(info?.usedSpace / (1024 * 1024))} MB
          </p>
          <p className="text-gray-700">
            Free Space: {Math.floor(info?.freeSpace / (1024 * 1024))} MB
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
        <div
          className="bg-white rounded-lg p-6 shadow-md overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          {recentObjects.map((object, id) => (
            <div className="mb-4" key={id}>
              <div className="border-b-2 border-gray-200 pb-4 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-2 text-black"> {object?.objectName}</h3>
                </div>
                <p className="text-gray-700">
                  Object Link:{" "}
                  <a className="text-blue-500" href={object?.objectLink}>
                    {object?.objectLink}
                  </a>
                </p>
                  <div className="flex justify-center">
                    <button className="bg-green-500  text-white py-1 mt-2 mr-1 rounded-md hover:bg-green-600 cursor-pointer w-32">
                      Copy Link
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
