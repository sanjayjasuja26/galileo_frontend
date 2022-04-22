import React from 'react'
import { location } from '../../../data';
import LocationElement from './LocationElement';

const Location = ({ locationValues, setLocationValues, showChecks }) => {

  return (                     
    <div className="col-lg-12 types d-flex location">
        <div className="w-15 loc">    
          <strong>Location</strong>                
        </div>                                   
        <div className="w-85 d-flex">
          {           
            location.map((obj, index) => {
              return (              
                <LocationElement 
                  key={index}
                  obj={obj}
                  locationValues={locationValues}
                  setLocationValues={setLocationValues}
                  showChecks={showChecks}
                />
              )
            })
          }                                    
        </div>                                
    </div>
  )
}

export default Location;