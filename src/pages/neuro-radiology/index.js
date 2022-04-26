import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import './neuro-radiology.css';
import Header from "../../components/Header";
import Findings from "../../components/NeuroRadiology/Findings";
import Impressions from "../../components/NeuroRadiology/Impressions";
import { attemptCase, fetchCase, fetchDiseases, getAttemptedCase } from "../../redux/action/cases";
import Location from "../../components/NeuroRadiology/Location";
import { findings } from "../../data";                    
import { CASE_STATUS } from "../../constants";
import Loader from "../../components/Common/Loader";
import { setInitialCaseValues } from "../../utils/helper";

const NeuroRadiology = () => {

  const { caseId } = useParams();

  const dispatch = useDispatch();   
  const { user } = useSelector(state => state.auth);
  const { diseases, singleCase, attemptedCase: { loading, attemptedC } } = useSelector(state => state.cases);         

  const [impressions, setImpressions] = useState({
    first: { value: '', link: '', result: '' },
    second: { value: '', link: '', result: '' },     
    third: { value: '', link: '', result: '' }   
  });              
  const [findingValues, setFindingValues] = useState({});
  const [locationValues, setLocationValues] = useState([]);
  const [showChecks, setShowChecks] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if(caseId && user){
      dispatch(getAttemptedCase({ id: caseId, user: user.user_email, }))
    }                   
  }, [caseId, user, dispatch])

  useEffect(() => {                    
    dispatch(fetchDiseases());                 
    caseId && dispatch(fetchCase({ page: 1, id: caseId, startAt: '', loading: true, user: user.user_email })    )                                                                          
  }, [dispatch, caseId, user]        )                                                                             
    
  useEffect(() => {  
    if(attemptedC && diseases.data.length > 0){
      setShowChecks(true);                        
      setHasSubmitted(true);                        
      setInitialCaseValues({attemptedC, setFindingValues, setLocationValues, setImpressions, diseases})
    }               
  }, [attemptedC, diseases])  
  
  const calcObservationScore = () => {
    let score = 0;
    if(singleCase){
      for(let i in findingValues){
        if(findingValues[i] === singleCase[i]){
          score++;
        }
      }

      if(locationValues === singleCase.location){
        score++;
      }
    }

    return score;
  }

  const calcInferenceScore = () => {
    if(impressions){
      for(let i in impressions){
        if(impressions[i].result === 'correct'){
          return impressions[i].result;
        } else if(impressions[i].result === 'acceptable'){
          return impressions[i].result;      
        } else if(impressions[i].result === 'incorrect'){
          return impressions[i].result;
        } else {
          return impressions[i].result;
        }
      }

    }
  }

  const handleNext = async () => {                            
    if(
      findings.length === Object.keys(findingValues).length && 
      (impressions.first.value !== '' && impressions.second.value !== '' && impressions.third.value !== '') &&
      locationValues && singleCase                                
    ){                   

      setShowChecks(true);   
      
      if(!hasSubmitted){
        const obj = {                 
          case_id: singleCase.case_id,
          modality: singleCase.modality,
          user_id: user.user_email,
          status: CASE_STATUS.COMPLETED,
          flair_entered: findingValues.flair,
          flair_eval: findingValues.flair === singleCase.flair ? 'correct' : 'incorrect',                        
          t1_entered: findingValues.t1,
          t1_eval: findingValues.t1 === singleCase.t1 ? 'correct' : 'incorrect',
          t2_entered: findingValues.t2, 
          t2_eval: findingValues.t2 === singleCase.t2 ? 'correct' : 'incorrect',
          contrast_enhancement_entered: findingValues.contrast_enhancement,
          contrast_enhancement_eval: findingValues.contrast_enhancement === singleCase.contrast_enhancement ? 'correct' : 'incorrect',
          susceptibility_artifact_entered: findingValues.susceptibility_artifact,
          susceptibility_artifact_eval: findingValues.susceptibility_artifact === singleCase.susceptibility_artifact ? 'correct' : 'incorrect',
          diffusion_entered: findingValues.diffusion,
          diffusion_eval: findingValues.diffusion === singleCase.diffusion ? 'correct' : 'incorrect',
          size_entered: findingValues.size,
          size_eval: findingValues.size === singleCase.size ? 'correct' : 'incorrect',       
          mass_effect_entered: findingValues.mass_effect,
          mass_effect_eval: findingValues.mass_effect === singleCase.mass_effect ? 'correct' : 'incorrect',
          num_lesion_entered: findingValues.num_lesion,
          num_lesion_eval: findingValues.num_lesion === singleCase.num_lesion ? 'correct' : 'incorrect',
          dominant_pattern_entered: findingValues.dominant_pattern,
          dominant_pattern_eval: findingValues.dominant_pattern === singleCase.dominant_pattern ? 'correct' : 'incorrect',
          side_entered: findingValues.side,
          side_eval: findingValues.side === singleCase.side ? 'correct' : 'incorrect',       
          location_entered: locationValues,
          location_eval: locationValues === singleCase.location ? 'correct' : 'incorrect',
          acceptable_diagnosis1_entered: impressions.first.value,
          acceptable_diagnosis1_eval: impressions.first.result,
          acceptable_diagnosis2_entered: impressions.second.value,
          acceptable_diagnosis2_eval: impressions.second.result,
          acceptable_diagnosis3_entered: impressions.third.value,
          acceptable_diagnosis3_eval: impressions.third.result,
          observation_score_total: Object.keys(findingValues).length + 1,
          observation_score: `${calcObservationScore()}/${Object.keys(findingValues).length + 1}`,
          inference_score_total: 3, 
          inference_score: calcInferenceScore()
        }

        const isSubmit = dispatch(attemptCase(obj));

        if(isSubmit){      
          toast.success('Case Attempt Success');
          setHasSubmitted(true);
        } else {                            
          toast.error('Something went wrong');
        }    
      }                                    
    } else {                   
      toast.error('Please fill the complete form')
    }                              
  }                         

  return (
    <>
      <Header />
        <section className="body">            
          <div className="container">
            {             
              loading ?
              <div className="text-center mt-4">
                <Loader />
              </div>                           
              :             
              <div className="row">                                  
                <div className="inner-wrap">
                  <div className="heading d-flex justify-content-between">
                    <p>                                                      
                      {" "}                                         
                      Brain Pathologies : <a href="/">Study ID : {caseId}</a>
                    </p> 
                    {
                      singleCase?.age &&
                      <p>                               
                        {" "}                                 
                        Patient Age :<a href="/"> {singleCase.age}</a>
                      </p>   
                    }                                
                  </div>                                         
                  <div className="findings row">
                    <Findings findingValues={findingValues} setFindingValues={setFindingValues} showChecks={showChecks} /> 
                    <Location locationValues={locationValues} setLocationValues={setLocationValues} showChecks={showChecks} />       
                  </div>                                               
                  <Impressions impressions={impressions} setImpressions={setImpressions} showChecks={showChecks} />                   
                </div>             
                <div className="next d-flex justify-content-end mt-3 mb-5">
                  {
                    (!hasSubmitted) &&
                    <button type="button" className="btn btn-primary" onClick={() => {
                        handleNext()
                    }}>Next</button>
                  }                     
                </div>   
              </div>  
            }           
          </div>                                  
        </section>
    </>  
  );      
};   
   
export default NeuroRadiology;