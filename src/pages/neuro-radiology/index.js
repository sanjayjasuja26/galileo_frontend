import React, { useEffect, useState } from "react";
import './neuro-radiology.css';
import Header from "../../components/Header";
import Findings from "../../components/NeuroRadiology/Findings";
import Impressions from "../../components/NeuroRadiology/Impressions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCase, fetchDiseases } from "../../redux/action/cases";
import Location from "../../components/NeuroRadiology/Location";
import { findings } from "../../data";

const NeuroRadiology = () => {

  const { caseId } = useParams();

  const dispatch = useDispatch();   
  const { singleCase } = useSelector(state => state.cases)

  const [findingValues, setFindingValues] = useState({});
  const [impressions, setImpressions] = useState(null);
  const [locationValues, setLocationValues] = useState(null);
  const [showChecks, setShowChecks] = useState(false);

  useEffect(() => {                    
    dispatch(fetchDiseases());         
    caseId && dispatch(fetchCase({ page: 1, id: caseId, startAt: '', loading: true }))                                                                    
  }, [dispatch, caseId]   )                                                                           
                  
  const handleNext = () => {    
    console.log(findingValues);
    console.log(findings.length, Object.keys(findingValues).length);      
    if(findings.length !== Object.keys(findingValues).length) return; 

    setShowChecks(true);

    console.log("findingValues", findingValues);
    console.log("impressions", impressions);
    console.log("locationValues", locationValues);
    console.log("singleCase", singleCase);

  }                         

  return (
    <>
      <Header />
      <section className="body">
        <div className="container">
          <div className="row">
            <div className="inner-wrap">
              <div className="heading d-flex justify-content-between">
                <p>                                                 
                  {" "}                            
                  Brain Pathologies : <a href="/">Study ID : {caseId}</a>
                </p>        
                <p> 
                  {" "}  
                  Patient Age :<a href="/">45</a>
                </p>    
              </div>                                         
              <div className="findings row">
                <Findings findingValues={findingValues} setFindingValues={setFindingValues} showChecks={showChecks} /> 
                <Location locationValues={locationValues} setLocationValues={setLocationValues} showChecks={showChecks} />       
              </div>                                             
              <Impressions impressions={impressions} setImpressions={setImpressions} />                   
            </div>  
            <div className="next d-flex justify-content-end mt-3 mb-5">
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>             
          </div>                
        </div>                                  
      </section>
    </>
  );
};

export default NeuroRadiology;


