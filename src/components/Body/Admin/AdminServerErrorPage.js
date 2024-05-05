import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/loginContext";
import { megaBytesConverter, timeConverter } from "../../../utils/utilityFunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import ServerErrorDetailsPage from "./AdminServerErrorDetailsPage";

const AdminServerErrorInfo = () => {
  const { whoLogedIn, isLogedIn } = useContext(LoginContext);

  const [data, setData] = useState({});
  const [fullData, setFullData] = useState(null);

  const getServerInfo = async () => {
    try {
      console.log(whoLogedIn);
      const response = await axios.get(
        process.env.BACKENDAPI + `/admin/${whoLogedIn?.id}/serverinfo/v2`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServerInfo();
  }, [isLogedIn]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex ">
      {/* Error List */}
      <div className="bg-gray-700 p-4 w-1/5 min-w-[50vh]">
        <h2 className="text-xl font-semibold ">Server Errors</h2>
        <p className="mb-4">total Errors : {data?.serverErrors?.length}</p>
        <div className="overflow-y-auto max-h-screen">
          {data?.serverErrors?.map((error, index) => (
            // <Link to={`/admin/server/error/${error?._id}`}>
            <div
              key={index}
              className="bg-gray-500 rounded-lg p-4 mb-4 cursor-pointer"
              onClick={() => setFullData(error)}
            >
              <p className="text-lg font-semibold mb-2">URL: {error.url}</p>
              <p className="text-gray-300 mb-2">Error Type: {error.errorType.join(", ")}</p>
              {/* <p className="text-gray-300 mb-2">Location: {error.errorLocation}</p> */}
              {/* <p className="text-gray-300 mb-2">IP Address: {error.ipAddress}</p> */}
              <p className="text-gray-300 mb-2">Resolved: {error.resolved ? "Yes" : "No"}</p>
              <p className="text-gray-300 mb-2">Created At: {timeConverter(error.createdAt)}</p>
            </div>
            // </Link>
          ))}
        </div>
      </div>

      {/* Server Info */}
      <div className="flex-1 p-4 min-w-[50%]">
        <h1 className="text-3xl font-bold mb-8">Server Error Details</h1>

        {!fullData ? <div className="text-center mt-40 text-3xl font-bold"><p>select the error</p></div> : <ServerErrorDetailsPage data={fullData} />}
      </div>
    </div>
  );
};

export default AdminServerErrorInfo;
