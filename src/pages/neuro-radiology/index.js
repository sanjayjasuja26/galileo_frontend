import React, { useEffect } from "react";
import './neuro-radiology.css'
import Header from "../../components/Header";
import Findings from "../../components/NeuroRadiology/Findings";
import Impressions from "../../components/NeuroRadiology/Impressions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCase } from "../../redux/action/cases";

const NeuroRadiology = () => {

  const { caseId } = useParams();

  const dispatch = useDispatch();
  const { singleCase } = useSelector(state => state.cases)

  useEffect(() => {            
    caseId && dispatch(getCase(caseId))
  }, [dispatch, caseId])                

  console.log(singleCase);

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
              <Findings />     
              <Impressions />        
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NeuroRadiology;
