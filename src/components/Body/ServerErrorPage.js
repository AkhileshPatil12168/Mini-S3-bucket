import React from "react";

const ServerErrorPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Error 500</h1>
      <p className="text-lg mb-4 text-center">
        We're sorry, but something went wrong on our end. Please try again later.
      </p>
      <p className="text-lg text-center">
        In the meantime, you can contact our support team at support@example.com for assistance.
      </p>
    </div>
  );
};

export default ServerErrorPage;
