import React, { useEffect, useState } from "react";
import './neuro-radiology.css';
import Header from "../../components/Header";
import Findings from "../../components/NeuroRadiology/Findings";
import Impressions from "../../components/NeuroRadiology/Impressions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCase, fetchDiseases } from "../../redux/action/cases";
import Location from "../../components/NeuroRadiology/Location";

const NeuroRadiology = () => {

  const { caseId } = useParams();

  const dispatch = useDispatch();
  const { singleCase } = useSelector(state => state.cases)

  const [findingValues, setFindingValues] = useState(null);
  const [impressions, setImpressions] = useState(null);
  const [locationValues, setLocationValues] = useState(null);

  useEffect(() => {      
    dispatch(fetchDiseases());      
    caseId && dispatch(fetchCase({ page: 1, id: caseId, startAt: '', loading: true }))
  }, [dispatch, caseId])                                                           

  console.log(singleCase);
                  
  const handleNext = () => {
    console.log("findingValues", findingValues);
    console.log("impressions", impressions);
    console.log("locationValues", locationValues);
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
                <Findings findingValues={findingValues} setFindingValues={setFindingValues} /> 
                <Location locationValues={locationValues} setLocationValues={setLocationValues} />       
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


