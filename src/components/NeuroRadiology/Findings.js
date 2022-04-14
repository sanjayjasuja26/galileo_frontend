import React, { useState } from "react";
import { findings, location } from "../../data";

const Findings = () => {

  const [findingValues, setFindingValues] = useState(null);
  const [locationValues, setLocationValues] = useState(null);

  const checkValues = () => {
    console.log(findingValues, locationValues);
  }

  return (
    <div className="findings row">
      <div className="col-lg-6">
        <div className="inner-cover">
          <div>      
            <h5>Findings</h5>
          </div>                                      
          {             
            findings.map(obj => (
            <div className="types d-flex">
              <div className="w-25">
                <strong>{obj.title} </strong>
              </div>
              <div className="w-75 d-flex">
                {                   
                  obj.options.map(opt => (
                  <div className={findingValues?.[obj.value] === opt.value ? "cat highlight" : "cat"} onClick={() => {
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
            ))
          }               
        </div>
      </div>
      {/* <div className="col-lg-6">
        <div className="right-cover">
          <div>
            <h5>Findings</h5>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Size </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  size: '1 cm'
                }))       
              }}>
                <span>&#60; 1 cm</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  size: '1 - 3 cm'
                }))
              }}>
                <span>1 - 3 cm</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  size: '3 cm'
                }))
              }}>            
                <span>&#62; 3 cm</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  size: 'NA'
                }))
              }}>
                <span>N/A</span>
              </div>
            </div>
          </div>                  
          <div className="types d-flex">
            <div className="w-25">
              <strong>Mass effect </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  mass_effecte: 'positive'
                }))
              }}>
                <span>Positive</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  mass_effect: 'none'
                }))
              }}>
                <span>None</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  mass_effect: 'negtive'
                }))
              }}>
                <span>Negtive (atrophy)</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  mass_effect: 'NA'
                }))                
              }}>
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Number of Lesions </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  number_of_lesions: 'single'
                }))
              }}>
                <span>Single</span>
              </div>               
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  number_of_lesions: 'multiple'
                }))
              }}>
                <span>Multiple</span>
              </div>             
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  number_of_lesions: 'NA'
                }))
              }}>
                <span>N/A</span>
              </div>
            </div>
          </div>                   
          <div className="types d-flex">
            <div className="w-25">
              <strong>Dominant Pattern </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  dominant_pattern: 'homogeneous'
                }))
              }}>
                <span>Homogeneous </span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  dominant_pattern: 'ring'
                }))
              }}>
                <span>Ring</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  dominant_pattern: 'heterogeneous'
                }))
              }}>
                <span>Heterogeneous </span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  dominant_pattern: 'NA'
                }))
              }}>
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Side </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  side: 'left'
                }))
              }}>
                <span>Left</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  side: 'right'
                }))
              }}>
                <span>Right</span>
              </div>  
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  side: 'bilateral symmetric'
                }))
              }}>
                <span>Bilateral Symmetric</span>
              </div> 
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  side: 'bilateral asymmetric'
                }))
              }}>
                <span>Bilateral Asymmetric</span>
              </div>
              <div className="cat" onClick={() => {
                setSelectedValues(prev => ({
                  ...prev,
                  side: 'NA'
                }))
              }}>
                <span>N/A</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="col-lg-12 types d-flex location">
        <div className="w-25">
          <strong>Location</strong>
        </div>
        <div className="w-75 d-flex">
          {
            location.map(obj => (              
              <div className="cat">
                <span>{obj.title}</span>
                <div className="d-flex">
                  {     
                    obj.options.map(op => (
                      <spna onClick={() => setLocationValues(prev => ({
                        ...prev,
                        [obj.value]: op.value
                      }))}>{op.text},</spna>
                    ))
                  }        
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>                        
  );
};

export default Findings;
