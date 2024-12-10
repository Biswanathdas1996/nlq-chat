import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <div className="typmg">
        <span>Generating</span>
        <div id="loading-dot"></div>
      </div>
    </>
  );
};

export default Loader;
