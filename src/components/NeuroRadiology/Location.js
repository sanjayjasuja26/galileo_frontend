import React from 'react'
import { location } from '../../data';

const Location = ({ locationValues, setLocationValues }) => {

  return (                 
    <div className="col-lg-12 types d-flex location">
        <div className="w-15 loc">
          <strong>Location</strong>
        </div>
        <div className="w-85 d-flex">
          {         
            location.map((obj, index) => (              
              <div key={index} className="common_nav">    
                  <div className="cat">{obj.title}</div>
                <div className="drop-down-select">

                {     
                    obj.options.map((op, index) => (
                      <p key={index} onClick={() => setLocationValues(prev => ({
                        ...prev,              
                        [obj.value]: op.value
                      }))}>{op.text}</p>
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