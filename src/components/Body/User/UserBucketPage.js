import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import downArrow from "../../../icons/down-arrow-svgrepo-com.svg";
import { timeConverter } from "../../../utils/utilityFunctions";

const UserBucketPage = () => {
  const { cUserId, isLogedIn } = useContext(LoginContext);
  const { id } = useParams();

  const [copied, setCopied] = useState("Copy Link");
  const [angle, setAngle] = useState(0);

  const [bucketInfo, setBucketInfo] = useState(null);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [expandedObject, setExpandedObject] = useState(null);

  const [files, setFiles] = useState([]);
  const [uploadedObjects, setUploadedObjects] = useState([]);

  const [responseMessage, setResponceMessage] = useState(null);

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
    setExpandedObject((prevIndex) => (prevIndex === index ? null : index), console.log(index));
  };

  const rotate = (value) => {
    setAngle(Math.abs(angle - value));
    // ag = (Math.abs(ag - value))
    // console.log(ag-value)
  };

  const handleFiles = (e) => {
    const files = e.target.files;

    console.log(Object.values(files));
    setFiles(Object.values(files));
  };
  const getBucketData = async () => {
    try {
      const response = await axios.get(process.env.BACKENDAPI + `/user/${cUserId}/bucket/${id}`, {
        withCredentials: true,
      });
      setBucketInfo(response?.data?.data?.bucket);
      setBucketObjects(response?.data?.data?.objects);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = async (e) => {
    try {
      const formData = new FormData();
      e.preventDefault();
      for (let object of files) {
        formData.append("file", object);
      }
      const response = await axios.post(
        process.env.BACKENDAPI + `/user/${cUserId}/bucket/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response?.data);
      setUploadedObjects(response?.data?.data);
      setBucketObjects([...response?.data?.data,...bucketObjects])
      setResponceMessage(response?.data?.message);
    } catch (error) {
      setResponceMessage(error?.response?.data?.message);

      console.log(error);
    }
  };
  useEffect(() => {
    if (isLogedIn) getBucketData();

    setFiles([]);
  }, [isLogedIn]);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4">
      <div className="container mx-auto py-8 flex-grow md:px-40 ">
        <h1 className="text-3xl font-bold mb-8 text-center ">{bucketInfo?.bucketName}</h1>

        {/* Bucket Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 ">Bucket Details</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-semibold mb-2 text-black">
              Bucket Size: {Math.ceil(bucketInfo?.bucketSize / (1024 * 1024))} MB
            </p>
            <p className="text-lg font-semibold mb-2 text-black">
              Total Objects: {bucketInfo?.totalObjects}
            </p>
            <p className="text-lg font-semibold mb-2 text-black">
              Bucket create date: {timeConverter(bucketInfo?.createdAt)}
            </p>
          </div>
        </div>
        {/* Drag and Drop Box */}
        <div className="mt-8 border-dashed border-2 border-gray-400 p-4 bg-gray-600 grid">
          <input
            type="file"
            id="fileInput"
            className="bg-white text-black "
            onChange={handleFiles}
            multiple
          />
        </div>
        <div className=" h-6 mt-2 ">
          <p className="text-red-500 text-lg   text-center">{responseMessage} </p>
        </div>
        <div className="mt-4 text-center" onClick={uploadFiles}>
          <label className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 cursor-pointer">
            Upload
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ">Objects</h2>
          <div className=" grid-rows-1 md:grid-cols-1 gap-6 bg-gray-700 p-4 rounded-md max-h-80 overflow-y-auto">
            {bucketObjects?.map((object, index) => (
              <div key={index} className="relative bg-white rounded-lg p-4 shadow-md mb-4">
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
                    <div className="ml-4">
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
        <div className="flex justify-center">
          <button className="bg-red-500  text-white py-2 px-6 rounded-md hover:bg-red-600 cursor-pointer mt-2 ">
            Delete Bucket
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBucketPage;
