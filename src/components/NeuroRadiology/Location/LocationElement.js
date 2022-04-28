import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GreenCheckIconSVG,  
  RedCheckIconSVG,
} from "../../../assets/svgComponents";

const LocationElement = ({ obj, locationValues, setLocationValues, showChecks, compareLocation }) => {             

  const { attemptedCase: { attemptedC } } = useSelector(state => state.cases)
  const [showOptions, setShowOptions] = useState(false);
  const [comparedValues, setComparedValues] = useState(null);

  const matchParent = (forChecks) => {
    if(comparedValues){
      if(forChecks){
        const elm = comparedValues.location_eval.filter(el => el.parent === obj.value)[0];
        return elm ? (elm.parentValue === 'correct' ? true : false) : false
      } else {
        return comparedValues.location_entered.filter(el => el.parent === obj.value)[0] ? true : false
      }
    }
  }

  const matchChild = (forChecks, val) => {
    if(comparedValues){
      let elm;

      if(forChecks){
        elm = comparedValues.location_eval.filter(el => el.parent === obj.value)[0];

        if(elm){
          let child = elm.child.filter(c => c.el === val)[0];
          return child?.val === 'correct' ? true : false;
        }
      } else {
        elm = comparedValues.location_entered.filter(el => el.parent === obj.value)[0];

        if(elm){
          return elm.child.filter(c => c === val)[0] ? true : false;
        }
      }
    }
  }

  const showChild = useCallback(() => {
    if(comparedValues){
      const elm = comparedValues.location_entered.filter(el => el.parent === obj.value)[0];

      if(elm){
        return elm.child.length > 0 ? setShowOptions(true) : setShowOptions(false);
      }
    }
  }, [comparedValues, obj.value])

  useEffect(() => {
    showChild();
  }, [showChild])

  useEffect(() => {
    if(showChecks){
      if(attemptedC){
        setComparedValues(attemptedC);
      } else {
        let compVal = compareLocation();
        compVal && setComparedValues({
          location_eval: compVal,
          location_entered: locationValues
        });
      }
    }
  }, [showChecks, compareLocation, obj.value, attemptedC, locationValues])

  return (
    <div className="common_nav">
      <div    
        className={(showOptions || matchParent(false)) ? "cat highlight" : "cat"}
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
      {showChecks && matchParent(false) && (
        <small>        
          {
            matchParent(true) ? (
              <GreenCheckIconSVG />   
            ) : (
              <RedCheckIconSVG />
            )
          }
        </small>                 
      )}                        
      {
        (showOptions) &&  
        <div className="drop-down-select">      
            {obj.options.map((op, index) => ( 
              <div key={index} className="position-relative">
                <p  
                  className={matchChild(false, op.value) ? "pointer highlight" : "pointer"} 
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
                {showChecks && matchChild(false, op.value) && (
                  <small>        
                    {
                      matchChild(true, op.value) ? (
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

