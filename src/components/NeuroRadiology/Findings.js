import React from "react";
import { useSelector } from "react-redux";
import { GreenCheckIconSVG, RedCheckIconSVG } from "../../assets/svgComponents";
import { findings } from "../../data";

const Findings = ({ findingValues, setFindingValues, showChecks }) => {

  const { singleCase } = useSelector(state => state.cases);

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
              <div key={index} className="types d-flex">
                <div className="w-25">
                  <strong>{obj.title} </strong>
                </div>              
                <div className="w-75 d-flex">
                  {                   
                    obj.options.map((opt, index) => (
                    <div key={index} className={findingValues?.[obj.value] === opt.value ? "cat highlight" : "cat"} onClick={() => {
                      if(showChecks){
                        return;
                      }
                      setFindingValues(prev => ({
                        ...prev,                                                
                        [obj.value]: opt.value
                      }))            
                    }}>                        
                      <span>{opt.text}</span>
                      {
                        (showChecks && singleCase && (findingValues?.[obj.value] === opt.value)) &&
                        <small>
                          {
                            (singleCase[obj.value] === opt.value)
                            ? <GreenCheckIconSVG /> : <RedCheckIconSVG />
                          }
                        </small> 
                      }            
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
    <div className="col-lg-6">
      <div className="right-cover">                                
        {             
          findings2.map((obj, index) => {
            return (
              <div key={index} className="types d-flex">
                <div className="w-25">
                  <strong>{obj.title} </strong>
                </div>              
                <div className="w-75 d-flex">
                  {                   
                    obj.options.map((opt, index) => (
                    <div key={index} className={findingValues?.[obj.value] === opt.value ? "cat highlight" : "cat"} onClick={() => {
                      if(showChecks){
                        return;
                      }
                      setFindingValues(prev => ({
                        ...prev,                                                
                        [obj.value]: opt.value
                      }))            
                    }}>                        
                      <span>{opt.text}</span>
                      {
                        (showChecks && singleCase && (findingValues?.[obj.value] === opt.value)) &&
                        <small>
                          {
                            (singleCase[obj.value] === opt.value)
                            ? <GreenCheckIconSVG /> : <RedCheckIconSVG />
                          }
                        </small> 
                      }            
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
    </>
  );
};                   

export default Findings;             