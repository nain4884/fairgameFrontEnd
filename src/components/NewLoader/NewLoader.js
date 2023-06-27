import React, { memo } from "react";
import "./styles.css";
const NewLoader = () => {
  return (
    <div className="loading-overlay" id="loading">
      <div className="loading-wrap">
        <div className="loading">
          <div></div>
          <div></div>
        </div>
        {/* <p>Loading...</p> */}
      </div>
    </div>
  );
};

export default memo(NewLoader);
