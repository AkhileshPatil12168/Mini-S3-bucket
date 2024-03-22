import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/loginContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoragePage = () => {
  const { cUserId } = useContext(LoginContext);
const navigate = useNavigate()



  const [storageInfo, setStorageInfo] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(process.env.BACKENDAPI + `/user/${cUserId}/storageinfo/v2`, {
        withCredentials: true,
      });
      console.log(response?.data?.data);
      setStorageInfo(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-2">
      <div className="container mx-auto py-8 flex-grow md:px-40 ">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Storage Overview</h1>

        {/* Storage Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Storage Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700">Storage Size: {Math.ceil(storageInfo?.storageSize/(1024*1024))} MB</p>
              <p className="text-gray-700">Used Space: {Math.ceil(storageInfo?.usedSpace/(1024*1024))} MB</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700">Total Buckets: {storageInfo?.totalBuckets}</p>
              <p className="text-gray-700">Total Objects: {storageInfo?.totalObjects}</p>
            </div>
          </div>
        </div>

        {/* Buckets Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Buckets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storageInfo?.buckets?.map((bucket, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {bucket?.bucketId?.bucketName}
                  </h3>
                  <p className="text-gray-700">Size: {Math.ceil(bucket?.bucketId?.bucketSize/(1024*1024))} MB</p>
                  <p className="text-gray-700">Objects: {bucket?.bucketId?.totalObjects}</p>
                </div>
                <button onClick={()=>navigate(`/bucket/${bucket?.bucketId?._id}`)} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-8 rounded-md mr-4">
                  Upload
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
