import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import downArrow from "../../../icons/down-arrow-svgrepo-com.svg";
import { timeConverter } from "../../../utils/utilityFunctions";

const AdminBucketPage = () => {
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);
  const { bucketId } = useParams();

  const [copied, setCopied] = useState("Copy Link");
  const [angle, setAngle] = useState(0);
  let ag = 0;
  const [bucketInfo, setBucketInfo] = useState(null);
  const [bucketObjects, setBucketObjects] = useState([{}]);
  const [expandedObject, setExpandedObject] = useState(null);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopied("✓ Copied");
    (() => {
      setTimeout(() => {
        setCopied("Copy Link");
      }, 2000);
    })();
  };

  const toggleObjectExpansion = (index) => {
    setExpandedObject((prevIndex) => (prevIndex === index ? null : index));
  };

  const rotate = (value) => {
    setAngle(Math.abs(angle - value));
    // ag = (Math.abs(ag - value))
    // console.log(ag-value)
  };

  const getBucketData = async () => {
    try {
      const response = await axios.get(
        process.env.BACKENDAPI + `/admin/${whoLogedIn.id}/bucket/${bucketId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setBucketInfo(response?.data?.data?.bucket);
      setBucketObjects(response?.data?.data?.objects);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    if (isLogedIn) getBucketData();
  }, [isLogedIn]);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4">
      <div className="container mx-auto py-8 flex-grow md:px-40 ">
        <h1 className="text-3xl font-bold mb-8 text-center ">{bucketInfo?.bucketName}</h1>

        {/* Bucket Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 ">Bucket Details</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-semibold mb-2 text-black">User Id: {bucketInfo?.userId}</p>
            <p className="text-lg font-semibold mb-2 text-black">
              Bucket Size: {Math.ceil(bucketInfo?.bucketSize / (1024 * 1024))} MB
            </p>
            <p className="text-lg font-semibold mb-2 text-black">
              Total Objects: {bucketInfo?.totalObjects}
            </p>
            <p className="text-lg font-semibold mb-2 text-black">
              Created date: {timeConverter(bucketInfo?.createdAt)}
            </p>
            <p className="text-lg font-semibold mb-2 text-black">
              Updated date: {timeConverter(bucketInfo?.updatedAt)}
            </p>
            {/* <p className="text-lg font-semibold mb-2 text-black text-wrap">
              Bucket Path: {bucketInfo?.bucketPath}
            </p> */}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ">Objects</h2>
          <div className=" grid-rows-2 md:grid-cols-1 gap-6 bg-gray-700 p-4 rounded-md max-h-96 overflow-y-auto ">
            {bucketObjects.map((object, index) => (
              <div key={index} className="relative bg-white rounded-lg p-4 shadow-md mb-4 ">
                <div
                  className="flex justify-between items-center mb-2 cursor-pointer bg-gray-300 p-2 rounded-md"
                  onClick={() => {
                    toggleObjectExpansion(index), rotate(180);
                  }}
                >
                  <p className="text-lg font-semibold text-black text-wrap ">
                    {object?.objectName}
                  </p>

                  <img src={downArrow} className={`h-4 rotate-${angle} duration-500`}></img>
                </div>
                {expandedObject === index && (
                  <div>
                    <div className="ml-4 ">
                      <p className="text-gray-700">Type: {object?.objectType}</p>
                      <p className="text-gray-700">
                        Size: {Math.ceil(object?.objectSize / 1024)} KB
                      </p>
                      <p className="text-gray-700">
                        Link:{" "}
                        <a href={object?.objectLink} className="text-blue-500">
                          {object?.objectLink}
                        </a>
                      </p>
                      <p className="text-gray-700">Object Type: {object?.objectType}</p>
                      {/* <p className="text-gray-700 ">Object Path: {object?.objectPath}</p> */}
                      <p className="text-gray-700">Mini Id: {object?.objectMiniId}</p>
                    </div>
                    <div className="flex flex-row justify-center mt-2 ">
                      <button
                        onClick={() => copyLink(object?.objectLink)}
                        className="bg-green-500  text-white py-2 px-6 mr-2 rounded-md hover:bg-green-600 cursor-pointer w-32"
                      >
                        {copied}
                      </button>
                      <button className="bg-red-500  text-white py-2 px-6 rounded-md hover:bg-red-600 cursor-pointer w-32">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBucketPage;
