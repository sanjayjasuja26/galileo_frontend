import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GreenCheckIconSVG,  
  RedCheckIconSVG,
} from "../../../assets/svgComponents";

const LocationElement = ({ obj, locationValues, setLocationValues, showChecks }) => {             

  const { singleCase } = useSelector(state => state.cases)
  const [showOptions, setShowOptions] = useState(false);
 
  const matchValues = () => {
    if(showChecks && singleCase?.location){
      const arr = singleCase.location.split(';');

      if(arr.length){
        for(let el in arr){
          if(arr[el].includes(obj.value) || arr[el] === obj.value){
            return true;
          }
        }
      }
    }
  }

  const matchChild = (value) => {
    if(singleCase?.location){
      const arr = singleCase.location.split(';');

      if(arr.length){
        for(let el in arr){
         let values = (arr[el].split(' '));
         console.log(values);
        //  for(let v in values){
          // console.log(values[v], value);

          //  if(values[v] === value){
          //    return true;
          //  }
           
        //  }
        }
      }
    }
  }

  return (
    <div className="common_nav">
      <div    
        className={(showOptions || matchValues()) ? "cat highlight" : "cat"}
        onClick={(e) => { 
          if (showChecks) {       
            return; 
          }            
          setShowOptions(!showOptions);
          const elm = locationValues.filter(l => l.parent === obj.value);
          if(!elm.length){
            setLocationValues([
              ...locationValues,   
              {
                parent: obj.value,
                child: []
              }
            ])        
          }
        }}    
      >
        {obj.title}  
      </div>                      
      {showChecks && singleCase && matchValues() && (
        <small>        
          {
            matchValues() ? (
              <GreenCheckIconSVG />   
            ) : (
              <RedCheckIconSVG />
            )
          }
        </small>                 
      )}                        
      {
        (showOptions || matchValues()) &&  
        <div className="drop-down-select">      
            {obj.options.map((op, index) => ( 
              <>
                <p 
                  key={index} 
                  className={(matchChild(op.value) && matchValues()) ? "pointer highlight" : "pointer"} 
                  onClick={(e) => {
                    e.target.classList.toggle('highlight');

                    if(e.target.classList.contains('highlight')){
                      const elm = locationValues.filter(l => l.parent === obj.value)
                      if(elm.length){
                        setLocationValues([
                          ...locationValues.filter(l => l.parent !== obj.value),
                          {
                            ...elm[0],
                            child: [ ...elm[0].child, op.value ]
                          }
                        ])  
                      } else {
                        setLocationValues([
                          ...locationValues,
                          {
                            parent: obj.value,
                            child: [op.value]
                          }    
                        ])    
                      }
                    }
                }}>{op.text}</p>
                {showChecks && singleCase && matchValues() && (
                  <small>        
                    {
                      matchChild(op.value) ? (
                        <GreenCheckIconSVG />   
                      ) : (
                        <RedCheckIconSVG />
                      )
                    }
                  </small>                 
                )} 
              </>                  
            ))}                                            
        </div>                                  
      }                
    </div>
  );
};                                     

export default LocationElement;
