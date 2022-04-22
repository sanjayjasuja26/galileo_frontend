import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    GreenCheckIconSVG,
    RedCheckIconSVG,
    YellowCheckIconSVG,
} from "../../../assets/svgComponents";
import useOutsideClick from '../../../hooks/useOutsideClick';

const InputField = ({ impressions, setImpressions, filteredData, setFilteredData, showChecks, section }) => {

    const ref = useRef(null);

    const { diseases, singleCase } = useSelector((state) => state.cases)
    const [showOptions, setShowOptions] = useState(false);

    useOutsideClick(ref, () => {
        setShowOptions(false)
    });
    
    const checkDiagnosis = (forIcon, sec = null) => {

      const value = forIcon ? impressions[section].value : sec;

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

  return (
    <div className="col-lg-4 col-sm-6 px-2" ref={ref}>
        <div className="diagnosis"> 
          <p>1st Clinical Diagnosis {showChecks && impressions[section].link !== '' && <a href={impressions[section].link} target="_blank" rel="noreferrer">Reference</a>}</p> 
          <input   
            type="search"
            disabled={showChecks ? true : false}
            className="form-select"
            value={impressions[section].value}
            onFocus={() => {   
              if(showChecks) return;
              setShowOptions(true)
              setFilteredData({  
                ...filteredData,
                [section]: impressions[section].value ?  diseases.data.filter((dis) =>
                  dis.disease_name.toLowerCase().includes(impressions[section].value)
                ) : diseases.data,
              })
            }}
            onChange={(e) => {
              if(showChecks) return;
              setShowOptions(true)
              setImpressions((prev) => ({
                ...prev,
                [section]: {
                    value: e.target.value,
                    link: diseases.data.filter((dis) =>
                    dis.disease_name.toLowerCase().includes(e.target.value))[0]?.disease_reference,
                    result: checkDiagnosis(false, e.target.value)
                },
              }));
              setFilteredData({
                ...filteredData,
                [section]: diseases.data.filter((dis) =>
                  dis.disease_name.toLowerCase().includes(e.target.value)
                )  
              });               
            }}
          />
          {showChecks && singleCase && impressions[section].value && (
            <small>
              {
                checkDiagnosis(true)
              }
            </small>
          )}

          {showOptions && filteredData[section].length > 0 && (
            <div className="serach-result">
              {filteredData[section].map((dis) => {
                return <div key={dis.disease_id} className="pointer" onClick={() => {
                  setImpressions((prev) => ({
                    ...prev,
                    [section]: {
                        value: dis.disease_name,
                        link: dis.disease_reference ? dis.disease_reference : '',
                        result: checkDiagnosis(false, dis.disease_name)
                    },
                  }))
                }}>{dis.disease_name}</div>;
              })}
            </div>
          )}
        </div>
    </div>
  )
}

export default InputField