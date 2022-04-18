import React from 'react'
import { location } from '../../data';

const Location = ({ locationValues, setLocationValues }) => {

  return (                 
    <div className="col-lg-12 types d-flex location">
        <div className="w-25">
          <strong>Location</strong>
        </div>
        <div className="w-75 d-flex">
          {                    
            location.map((obj, index) => (              
              <div key={index} className="cat">    
                  <div>{obj.title}</div>                    
                  {     
                    obj.options.map((op, index) => (
                      <span key={index} onClick={() => setLocationValues(prev => ({
                        ...prev,              
                        [obj.value]: op.value
                      }))}>{op.text},</span>
                    ))  
                  }                
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Location;