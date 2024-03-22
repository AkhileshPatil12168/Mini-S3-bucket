import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";

const UserBucketPage = () => {
  const { cUserId } = useContext(LoginContext);
  const { id } = useParams();

  const [bucketInfo, setBucketInfo] = useState(null);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [expandedObject, setExpandedObject] = useState(null);

  const [files, setFiles] = useState([]);
  const [uploadedObjects, setUploadedObjects] = useState([])

  const toggleObjectExpansion = (index) => {
    setExpandedObject((prevIndex) => (prevIndex === index ? null : index), console.log(index));
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
        formData.append("file", object)
      }
      const response = await axios.post(
        process.env.BACKENDAPI + `/user/${cUserId}/bucket/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response?.data);
      setUploadedObjects(response?.data?.data)
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBucketData();
    setFiles([])
  }, [uploadedObjects]);

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

        <div className="mt-8 text-center" onClick={uploadFiles}>
          <label className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 cursor-pointer">
            Upload
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ">Objects</h2>
          <div className=" grid-rows-1 md:grid-cols-1 gap-6 bg-gray-700 p-4 rounded-md max-h-80 overflow-y-auto">
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
                    </div>
                    <div className="flex flex-row justify-center mt-2 ">
                      <button onClick={()=>{navigator.clipboard.writeText(object?.objectLink)}} className="bg-green-500  text-white py-2 px-6 mr-2 rounded-md hover:bg-green-600 cursor-pointer w-32">
                        Copy Link
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

export default UserBucketPage;
