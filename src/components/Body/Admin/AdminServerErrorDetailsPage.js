import React from "react";

const ServerErrorDetailsPage = ({data}) => {
  // Mock error data for demonstration
console.log(data)
  // Function to handle resolution of the error
  const handleResolveError = () => {
    // Logic to mark the error as resolved (e.g., send a request to update the error status)
    console.log("Error resolved:", errorDetails._id);
  };

  return (
    <>
 
      <div className="bg-gray-600 rounded-lg p-6 shadow-md max-w-[80vw]">
        <h2 className="text-xl font-semibold mb-4">Error ID: {data?._id}</h2>
        <p>URL: {data?.url}</p>
        <p>Original URL: {data?.originalUrl}</p>
        <p>Error Type: {data?.errorType.join(", ")}</p>
        <p>Error Location: {data?.errorLocation}</p>
        <p>IP Address: {data?.ipAddress}</p>
        <p>Resolved: {data?.resolved ? "Yes" : "No"}</p>
        <p>Created At: {new Date(data?.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(data?.updatedAt).toLocaleString()}</p>

        {/* Display Headers */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Headers</h3>
          <ul className="overflow-y-auto max-h-40 p-2 bg-gray-500">
            {data?.headers?Object.entries(data?.headers).map(([key, value], index) => (
              <li key={index}>
                <span className="font-semibold">{key}:</span> {value}
              </li>
            )):null}
          </ul>
        </div>

        {/* Resolve Button */}
        {!data?.resolved && (
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 cursor-pointer"
              onClick={handleResolveError}
            >
              Resolve
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ServerErrorDetailsPage;
