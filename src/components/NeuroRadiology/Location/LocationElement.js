import React, { useEffect, useRef, useState } from "react";
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

  // useEffect(() => {
  //   locationValues.includes(obj.value) && setShowOptions(true)
  // }, [locationValues, obj.value])  

  return (
    <div className="common_nav" ref={ref}>
      <div    
        className={showOptions ? "cat highlight" : "cat"}
        onClick={(e) => { 
          if (showChecks) {    
            return; 
          }                                             
          setLocationValues([...locationValues, obj.value]); 
          locationValues.includes(obj.value) && setShowOptions(!showOptions);
        }}    
      >
        {obj.title}  
      </div>                      
      {showChecks && singleCase && locationValues === obj.value && (
        <small>        
          {
            obj.value === singleCase.location ? (
              <GreenCheckIconSVG />   
            ) : (
              <RedCheckIconSVG />
            )
          }
        </small>                 
      )}                        
      {
        showOptions &&  
        <div className="drop-down-select">      
            {obj.options.map((op, index) => (  
              <p key={index} className="pointer" onClick={(e) => {
                e.target.classList.toggle('highlight')
              }}>{op.text}</p>                      
            ))}                                            
        </div>                                  
      }                
    </div>
  );
};                                     

export default LocationElement;
