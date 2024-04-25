import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../Context/loginContext";
import { timeConverter } from "../../../utils/utilityFunctions";

const ObjectsPage = () => {
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);

  const [objects, setobjects] = useState([]);

  const getObjects = async () => {
    try {
      const response = await axios.get(process.env.BACKENDAPI + `/user/${whoLogedIn?.id}/objects`, {
        withCredentials: true,
      });
      console.log(response.data.data);
      setobjects(response?.data?.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    if (isLogedIn) getObjects();
  }, [isLogedIn]);
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">My Objects</h1>

        <div className="overflow-y-auto md:overscroll-none md:px-10 ">
          <p>Total Objects: {objects.length}</p>
          <table className="min-w-full divide-y divide-yellow-400 ">
            <thead className="bg-yellow-400 text-center ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs  font-medium text-black uppercase tracking-wider "
                >
                  Object Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-black uppercase tracking-wider"
                >
                  Object Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-black uppercase tracking-wider"
                >
                  Size /KB
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-black uppercase tracking-wider"
                >
                  Bucket Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-black uppercase tracking-wider"
                >
                  Object Link
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-black uppercase tracking-wider"
                >
                  Object Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-white">
              {objects?.map((object, index) => (
                <tr key={index} className="text-white hover:bg-gray-600 text-center divide-x divide-black" >
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline overflow-auto max-w-96  ">
                    {object?.objectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline">{object?.objectType}</td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline">{Math.ceil(object?.objectSize/1024)}</td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline">{object?.bucketId?.bucketName}</td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline">{object?.objectLink}</td>
                  <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-500 hover:underline">{timeConverter(object?.createdAt,"date")}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ObjectsPage;
