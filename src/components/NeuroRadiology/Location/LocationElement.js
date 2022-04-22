import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  GreenCheckIconSVG,
  RedCheckIconSVG,
} from "../../../assets/svgComponents";
import useOutsideClick from "../../../hooks/useOutsideClick";

const LocationElement = ({ obj, locationValues, setLocationValues, showChecks }) => {

    const ref = useRef(null);          

  const { singleCase } = useSelector(state => state.cases)
  const [showOptions, setShowOptions] = useState(false);

  useOutsideClick(ref, () => {
    setShowOptions(false)
  });

  return (
    <div className="common_nav" ref={ref}>
      <div
        className={locationValues === obj.value ? "cat highlight" : "cat"}
        onClick={() => {
          if (showChecks) {
            return;
          }
          setLocationValues(obj.value);         
          setShowOptions(!showOptions);
        }}
      >
        {obj.title}
      </div>
      {showChecks && singleCase && locationValues === obj.value && (
        <small>
          {obj.value === singleCase.location ? (
            <GreenCheckIconSVG />
          ) : (
            <RedCheckIconSVG />
          )}
        </small>
      )}
      {
        showOptions && 
        <div className="drop-down-select">
            {obj.options.map((op, index) => (
              <p key={index}>{op.text}</p>
            ))}
        </div>              
      }
    </div>
  );
};

export default LocationElement;
