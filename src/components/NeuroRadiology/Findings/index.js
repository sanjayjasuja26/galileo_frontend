import React from "react";
import { findings } from "../../../data";
import FindingElement from "./FindingElement";

const Findings = ({ findingValues, setFindingValues, showChecks }) => {

  const findings1 = findings.slice(0, findings.length/2 + 1);
  const findings2 = findings.slice(findings.length/2 + 1);
  
  return (
    <>
    <div>      
      <h5>Findings</h5>
    </div>        
    <div className="col-lg-6">
      <div className="inner-cover">                              
        {             
          findings1.map((obj, index) => {
            return (
              <FindingElement 
                key={index}
                obj={obj}
                showChecks={showChecks}
                findingValues={findingValues}
                setFindingValues={setFindingValues}
              />
            )
          })
        }               
      </div>             
    </div> 
    <div className="col-lg-6">
      <div className="right-cover">                                
        {             
          findings2.map((obj, index) => {
            return (
              <FindingElement 
                key={index}
                obj={obj}
                showChecks={showChecks}
                findingValues={findingValues}
                setFindingValues={setFindingValues}
              />
            )
          })
        }  
      </div>
    </div>
    </>
  );
};                   

export default Findings;             