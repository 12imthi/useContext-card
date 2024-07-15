import React from "react";
import { useContext } from "react";
import { myContext } from "../App";

function Total() {
  const [data, setData] = useContext(myContext);

  return (
    <div className="col-12 total">
      <div className="col-6">
        <span>Total : </span> <br />
      </div>
      <div className="col-6">
        <div>
          <span>{data[0].price}</span>
        </div>
        <div>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Total;