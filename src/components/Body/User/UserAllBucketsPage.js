import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import axios from "axios";
import { timeConverter } from "../../../utils/utilityFunctions";

const BucketsPage = () => {
  const { cUserId, isLogedIn } = useContext(LoginContext);

  const [buckets, setBuckets] = useState([]);
  const [bucketName, setBucketName] = useState("");

  const handleChange = (e) => {
    setBucketName(e.target.value);
  };

  const getBuckets = async () => {
    try {
      const response = await axios.get(process.env.BACKENDAPI + `/user/${cUserId}/buckets`, {
        withCredentials: true,
      });

      console.log(response.data.data);
      setBuckets(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBucket = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("bucketName", bucketName);
      const response = await axios.post(
        process.env.BACKENDAPI + `/user/${cUserId}/bucket/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data);
      setBuckets([{ ...response?.data?.data }, ...buckets]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogedIn) getBuckets();
  }, [isLogedIn]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto py-8 ">
        <h1 className="text-3xl font-bold mb-8 text-center ">Buckets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center md:px-[5%]">
          <div className=" rounded-lg p-6 shadow-md bg-gray-200">
            <h2 className="text-3xl font-semibold mb-2 text-black h-auto">Create New Bucket</h2>
            <input
              type="text"
              className="rounded-md w-full text-black"
              placeholder="Bucket Name"
              value={bucketName}
              onChange={handleChange}
            ></input>
            <button onClick={createBucket} className="bg-green-400 p-2 rounded-md mt-2 w-full">
              Create
            </button>
          </div>
          {buckets?.length > 0 ? (
            buckets?.map((bucket, index) => (
              <Link to={`/bucket/${bucket?._id}`} key={index}>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h2 className="text-xl font-semibold mb-2 text-black">{bucket?.bucketName}</h2>
                  <p className="text-gray-700">
                    Bucket Size: {Math.ceil(bucket?.bucketSize / (1024 * 1024))} MB
                  </p>
                  <p className="text-gray-700">Total Objects: {bucket?.totalObjects}</p>
                  <p className="text-gray-700">
                    Created At:{" "}
                    {/* {bucket?.createdAt?.slice(0, 10) + "/" + (bucket?.createdAt?.slice(11))} */}
                    {timeConverter(bucket?.createdAt)}
                  </p>
                  <p className="text-gray-700">
                    Updated At:{" "}
                    {/* {bucket?.updatedAt?.slice(0, 10) + "/" + (bucket?.updatedAt?.slice(11))} */}
                    {timeConverter(bucket?.updatedAt)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default BucketsPage;
