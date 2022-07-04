import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    GreenCheckIconSVG,
    RedCheckIconSVG,           
    YellowCheckIconSVG,
} from "../../../assets/svgComponents";
import useOutsideClick from '../../../hooks/useOutsideClick';

const InputField = ({ impressions, setImpressions, filteredData, setFilteredData, showChecks, section, title }) => {
                             
    const ref = useRef(null);

    const { diseases, singleCase } = useSelector((state) => state.cases)
    const [showOptions, setShowOptions] = useState(false);
    const [inputVal, setInputVal] = useState('');

    const checkDiagnosis = useCallback((forIcon, sec = null) => {

      const value = forIcon ? impressions[section].value : sec;

      if(singleCase){
        const val = singleCase.known_ddx.toLowerCase() ===
        value.toLowerCase() 
        ? 
        (forIcon ? <GreenCheckIconSVG /> : 'correct')
        : 
        (singleCase.acceptable_diagnosis1.toLowerCase() ===
            value.toLowerCase() ||
          singleCase.acceptable_diagnosis2.toLowerCase() ===
            value.toLowerCase() ||
          singleCase.acceptable_diagnosis3.toLowerCase() ===
            value.toLowerCase()) 
        ? 
        (forIcon ? <YellowCheckIconSVG /> : 'acceptable')
        : 
        (forIcon ? <RedCheckIconSVG /> : 'incorrect')

        return val;
      }
    }, [impressions, singleCase, section])    

    useOutsideClick(ref, () => {
      setShowOptions(false);  
    });  
    
    useEffect(() => {
      impressions[section].value && setInputVal(impressions[section].value);
    }, [impressions, section])
    
    useEffect(() => {
      let disease = diseases.data.filter((dis) => dis.disease_name.toLowerCase() === inputVal.toLowerCase())[0]

      if(disease){
        setImpressions((prev) => ({
          ...prev,
          [section]: {
            value: disease.disease_name,
            link: disease.disease_reference,
            result: checkDiagnosis(false, disease.disease_name)
          },  
        }));
      } else {
        setImpressions((prev) => ({
          ...prev,
          [section]: {
            value: '',
            link: '',
            result: ''
          },  
        }));
      }
    }, [inputVal, diseases.data, section, setImpressions]);

  return (
    <div className="col-lg-4 col-sm-6 px-2" ref={ref}>
        <div className="diagnosis"> 
          <p>{title} Clinical Diagnosis {showChecks && impressions[section].link !== '' && <a href={impressions[section].link} target="_blank" rel="noreferrer" className='text-decoration-underline mx-2'>Reference</a>}</p> 
          <input   
            type="search"
            disabled={showChecks ? true : false}
            className={(!showOptions && inputVal && (impressions[section].value !== inputVal)) ? "form-select border border-danger text-danger" : "form-select"}
            value={inputVal}  
            onFocus={() => {   
              if(showChecks) return;          
              setShowOptions(true);
              setFilteredData({  
                ...filteredData,  
                [section]: inputVal ?  diseases.data.filter((dis) =>
                  dis.disease_name.toLowerCase().includes(inputVal.toLowerCase())
                ) : diseases.data,
              })
            }}  
            onChange={(e) => {
              if(showChecks) return;
              setShowOptions(true);         

              let disease = diseases.data.filter((dis) => dis.disease_name.toLowerCase().includes(e.target.value.toLowerCase()))[0]

              if(!disease) {
                setInputVal(inputVal);
                return;
              } else {
                setInputVal(e.target.value);
                setFilteredData({
                  ...filteredData,
                  [section]: diseases.data.filter((dis) =>
                    dis.disease_name.toLowerCase().includes(e.target.value.toLowerCase())
                  )  
                }); 
              }              
            }}
          />
          {   
            (!showOptions && inputVal && (impressions[section].value !== inputVal)) &&
            <div className='text-danger'>Please choose valid disease</div>
          }        
          {showChecks && singleCase && impressions[section].value && (
            <small>
              {
                checkDiagnosis(true)
              }
            </small>        
          )}
          {showOptions && (  
            <div className="serach-result">
              {
                filteredData[section].length > 0 ?
                filteredData[section].map((dis) => {
                  return <div key={dis.disease_id} className="pointer" onClick={() => {
                    setInputVal(dis.disease_name)
                  }}>{dis.disease_name}</div>;
                }) : 
                <p className='text-center text-danger'>No Disease Found</p>
              }        
            </div>
          )}
        </div>
    </div>
  )                         
}

export default InputField;