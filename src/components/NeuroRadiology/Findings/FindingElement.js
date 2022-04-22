import React from "react";
import { useSelector } from "react-redux";
import { GreenCheckIconSVG, RedCheckIconSVG } from "../../../assets/svgComponents";

const FindingElement = ({ obj, findingValues, showChecks, setFindingValues }) => {

  const { singleCase } = useSelector(state => state.cases);

  return (
    <div className="types d-flex">    
      <div className="w-25">
        <strong>{obj.title} </strong>
      </div>       
      <div className="w-75 d-flex">
        {obj.options.map((opt, index) => (
          <div
            key={index}
            className={
              findingValues?.[obj.value] === opt.value ? "cat highlight" : "cat"
            }           
            onClick={() => {
              if (showChecks) {
                return;
              }
              setFindingValues((prev) => ({
                ...prev,
                [obj.value]: opt.value,
              }));
            }}
          >
            <span>{opt.text}</span>
            {showChecks &&
              singleCase &&
              findingValues?.[obj.value] === opt.value && (
                <small>
                  {singleCase[obj.value] === opt.value ? (
                    <GreenCheckIconSVG />
                  ) : (
                    <RedCheckIconSVG />
                  )}
                </small>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindingElement;
