import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  GreenCheckIconSVG,  
  RedCheckIconSVG,
} from "../../../assets/svgComponents";

const LocationElement = ({ obj, locationValues, setLocationValues, showChecks }) => {             

  const { attemptedCase: { attemptedC }, singleCase } = useSelector(state => state.cases)
  const [showOptions, setShowOptions] = useState(false);
 
  const matchValues = (forHighLight) => {
    if(showChecks && attemptedC?.location_entered && singleCase?.location){
      const attemptArr = attemptedC.location_entered.split(';');
      const answerArr = singleCase.location.split(';');

      const arr = forHighLight ? attemptArr : answerArr;
      if(arr.length){
        for(let el in arr){
          if(arr[el].includes(obj.value) || arr[el].split('').includes(obj.value) || arr[el] === obj.value){
            return true;
          }
        }
      }
    }
  }

  const matchChild = (value, forHighLight) => {
    if(showChecks && attemptedC?.location_entered && singleCase?.location){
      const attemptArr = attemptedC.location_entered.split(';');
      const answerArr = singleCase.location.split(';');

      const arr = forHighLight ? attemptArr : answerArr;
      if(arr.length){
        for(let el in arr){
         let values = (arr[el].split(' '));
         for(let v in values){
           if(values[v] === value){
             return true;
           }
         }
        }
      }
    }
  }

  return (
    <div className="common_nav">
      <div    
        className={(showOptions || matchValues(true)) ? "cat highlight" : "cat"}
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
      {showChecks && attemptedC && matchValues(true) && (
        <small>        
          {
            matchValues(false) ? (
              <GreenCheckIconSVG />   
            ) : (
              <RedCheckIconSVG />
            )
          }
        </small>                 
      )}                        
      {
        (showOptions || matchValues(true)) &&  
        <div className="drop-down-select">      
            {obj.options.map((op, index) => ( 
              <div key={index} className="position-relative">
                <p  
                  className={(matchChild(op.value, true) && matchValues(true)) ? "pointer highlight" : "pointer"} 
                  onClick={(e) => {
                    !showChecks && e.target.classList.toggle('highlight');

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
                {showChecks && attemptedC && matchValues(true) && matchChild(op.value, true) && (
                  <small>        
                    {
                      matchChild(op.value, false) ? (
                        <GreenCheckIconSVG />   
                      ) : (
                        <RedCheckIconSVG />
                      )
                    }
                  </small>                 
                )} 
              </div>                  
            ))}                                            
        </div>                                  
      }                
    </div>
  );
};                                     

export default LocationElement;
