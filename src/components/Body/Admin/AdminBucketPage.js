import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";

const AdminBucketPage = () => {
  const { cUserId } = useContext(LoginContext);
  const { id } = useParams();

  const [bucketInfo, setBucketInfo] = useState({
    bucketName: "pdfs",
    bucketSize: 6636072,
    createdAt: "2024-03-15T20:56:24.621Z",
    totalObjects: 4,
    updatedAt: "2024-03-19T22:16:23.420Z",
    userId: "65f4b5c0e45e57258ea95cd7",
    _id: "65f4b5f8e45e57258ea95cdf",
    bucketPath:"H:\mini s3 bucket\Mini-S3-bucket\src\storages\65f4b5c0e45e57258ea95cd7\65f4b5f8e45e57258ea95cdf"
  });
  const [bucketObjects, setBucketObjects] = useState([
    {
      createdAt: "2024-03-19T22:16:23.408Z",
      objectLink: "http://localhost:3000/object/Gc3hKG2",
      objectMiniId: "Gc3hKG2",
      objectName: "Build_your_generative_AI_application_with_Amazon_Bedrock.pdf",
      objectSize: 6171244,
      objectType: "application/pdf",
      _id: "65fa0eb795166cd3e34a3ad7",
      objectPath:"H:/mini s3 bucket/Mini-S3-bucket backend\src\storages\65f4b5c0e45e57258ea95cd7\65f4b5f8e45e57258ea95cdf\new_Resume.pdf",
      objectMiniId:"asdf"
    },
    {
      createdAt: "2024-03-19T22:16:23.408Z",
      objectLink: "http://localhost:3000/object/Gc3hKG2",
      objectMiniId: "Gc3hKG2",
      objectName: "Build_your_generative_AI_application_with_Amazon_Bedrock.pdf",
      objectSize: 6171244,
      objectType: "application/pdf",
      _id: "65fa0eb795166cd3e34a3ad7",
      objectPath:"H:/mini s3 bucket/Mini-S3-bucket backend\src\storages\65f4b5c0e45e57258ea95cd7\65f4b5f8e45e57258ea95cdf\new_Resume.pdf",
      objectMiniId:"asdf"
    },
    {
      createdAt: "2024-03-19T22:16:23.408Z",
      objectLink: "http://localhost:3000/object/Gc3hKG2",
      objectMiniId: "Gc3hKG2",
      objectName: "Build_your_generative_AI_application_with_Amazon_Bedrock.pdf",
      objectSize: 6171244,
      objectType: "application/pdf",
      _id: "65fa0eb795166cd3e34a3ad7",
      objectPath:"H:/mini s3 bucket/Mini-S3-bucket backend\src\storages\65f4b5c0e45e57258ea95cd7\65f4b5f8e45e57258ea95cdf\new_Resume.pdf",
      objectMiniId:"asdf"
    },
  ]);
  const [expandedObject, setExpandedObject] = useState(null);


  const toggleObjectExpansion = (index) => {
    setExpandedObject((prevIndex) => (prevIndex === index ? null : index), console.log(index));
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
              Bucket create date: {bucketInfo?.createdAt}
            </p>
            <p className="text-lg font-semibold mb-2 text-black">
              Bucket Path: {bucketInfo?.bucketPath}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ">Objects</h2>
          <div className=" grid-rows-1 md:grid-cols-1 gap-6 bg-gray-700 p-4 rounded-md max-h-80 overflow-y-auto ">
            {bucketObjects.map((object, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg p-4 shadow-md mb-4"
                onClick={() => toggleObjectExpansion(index)}
              >
                <div className="flex justify-between items-center mb-2 cursor-pointer">
                  <h3 className="text-lg font-semibold text-black">{object?.objectName}</h3>
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
                      <p className="text-gray-700">Object Path: {object?.objectPath}</p>
                      <p className="text-gray-700">Mini Id: {object?.objectMiniId}</p>


                    </div>
                    {/* <div className="flex flex-row justify-center mt-2 ">
                      <button className="bg-green-500  text-white py-2 px-6 mr-2 rounded-md hover:bg-green-600 cursor-pointer w-32">
                        Copy Link
                      </button>
                      <button className="bg-red-500  text-white py-2 px-6 rounded-md hover:bg-red-600 cursor-pointer w-32">
                        Delete
                      </button>
                    </div> */}
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
