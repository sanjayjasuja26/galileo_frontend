import React from 'react'
import { useSelector } from 'react-redux';
import { GreenCheckIconSVG, RedCheckIconSVG } from '../../assets/svgComponents';
import { location } from '../../data';

const Location = ({ locationValues, setLocationValues, showChecks }) => {

  const { singleCase } = useSelector(state => state.cases)

  console.log(locationValues, singleCase?.location);

  return (                 
    <div className="col-lg-12 types d-flex location">
        <div className="w-15 loc">    
          <strong>Location</strong>
        </div>
        <div className="w-85 d-flex">
          {         
            location.map((obj, index) => (              
              <div key={index} className="common_nav">    
                <div className={locationValues === obj.value ? "cat highlight" : "cat"} onClick={() => {
                  if(showChecks){
                    return;
                  }
                  setLocationValues(obj.value);
                }}>{obj.title}</div>
                {
                  (showChecks && singleCase) &&
                  <small>
                    {
                      (obj.value === singleCase.location) ? <GreenCheckIconSVG /> : <RedCheckIconSVG />
                    }   
                  </small>
                }
                <div className="drop-down-select">
                  {     
                    obj.options.map((op, index) => (
                      <p key={index}>{op.text}
                      </p>
                    ))  
                  }    
                </div>
                             
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Location;