import React from "react";
import '../App.css';
export function NetworkErrorMessage({ message, dismiss }) {
  return (
    <div className="css-5n3810v3" role="alert">
      <span>
      {message}
      </span>
      {/* <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismiss}
      >
         <span aria-hidden="true">&times;</span> 
      </button> */}
    </div>
  );
}
