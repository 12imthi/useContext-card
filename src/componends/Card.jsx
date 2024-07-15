import React from "react";
import { useContext } from "react";
import { myContext } from "../App";

function Card() {
  const [data, setData] = useContext(myContext);

  return (
    <div className="col-12 row">
      <div className="col-2 ">
        {/* {
            data.map((img,i) => {
                return (
                    <div key={i}>
                      <img src={img.image} alt="" />
                    </div>
                )
            })
        } */}
        <img src={data[0].image} alt="" />
      </div>
      <div className="col-8 bg-body">
        <div className="col-12 row justify-content-between">
          <div className="col-8">
            <ul>
              <li>{data[0].title}</li>
              <li>{data[0].category}</li>
              <li>{data[0].description}</li>
              <li>{data[0].id}</li>
            </ul>
          </div>
          <div className="col-4">
            <button>1</button>
          </div>
        </div>
      </div>
      <div className="col-2 bg-body-secondary">
        <div className="col-12  ">
            <div>
                <h3>${data[0].price}</h3>
            </div>
            <div >
                <button>Remove</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
