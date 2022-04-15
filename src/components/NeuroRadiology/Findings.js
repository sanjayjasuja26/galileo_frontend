import React from "react";
import { findings } from "../../data";

const Findings = ({ findingValues, setFindingValues }) => {

  return (
    <div className="col-lg-6">
      <div className="inner-cover">
        <div>      
          <h5>Findings</h5>
        </div>                                      
        {             
          findings.map((obj, index) => {
            return (
              <div key={index} className="types d-flex">
                <div className="w-25">
                  <strong>{obj.title} </strong>
                </div>              
                <div className="w-75 d-flex">
                  {                   
                    obj.options.map((opt, index) => (
                    <div key={index} className={findingValues?.[obj.value] === opt.value ? "cat highlight" : "cat"} onClick={() => {
                      setFindingValues(prev => ({
                        ...prev,                                                
                        [obj.value]: opt.value
                      }))          
                    }}>                         
                      <span>{opt.text}</span>
                    </div>     
                    ))                       
                  }      
                </div>
              </div>
            )
          })
        }               
      </div>    
    </div>
  );
};

export default Findings;