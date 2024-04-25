import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import axios from "axios";
import { megaBytesConverter } from "../../../utils/utilityFunctions";

const AllStoragePage = () => {
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);
  console.log(whoLogedIn)

  const [storages, setStorages] = useState([]);

  const getStorages = async () => {
    try {
     
      const response = await axios.get(
        process.env.BACKENDAPI + `/admin/${whoLogedIn?.id}/storages`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data);
      setStorages(response?.data?.data)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if(isLogedIn)
    getStorages();
    console.log("hello")
  }, [isLogedIn]);
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto py-8 md:px-10 lg:px-20 xl:px-40 duration-500">
        <h1 className="text-3xl font-bold mb-8 text-center">Storages</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storages.map((storage, index) => (
            <Link key={index} to={`/admin/storage/${storage?._id}`}>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-2 text-black">
                  Storage ID: {storage?._id}
                </h2>
                <p className="text-gray-700">User ID: {storage?.userId}</p>
                <p className="text-gray-700">Size: {megaBytesConverter(storage?.storageSize,"ceil")} MB</p>
                <p className="text-gray-700">Used Size: {megaBytesConverter(storage?.usedSpace, "floor")} MB</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 mr-2">
            Previous
          </button>
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 ml-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllStoragePage;
