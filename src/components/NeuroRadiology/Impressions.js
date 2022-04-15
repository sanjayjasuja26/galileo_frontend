import React from "react";
import { useSelector } from "react-redux";

const Impressions = ({ impressions, setImpressions }) => {
  const { diseases } = useSelector((state) => state.cases);

  return (
    <div className="impression row">
      <div>
        <h5>impressions</h5>
      </div>
      <div className="col-lg-4 col-sm-6">
        <div className="diagnosis">
          <p>1st Clinical Diagnosis</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              setImpressions((prev) => ({
                ...prev,
                first: e.target.value,
              }))   
            }   
          >                             
            {diseases.data.length > 0 &&
              diseases.data.map((dis) => (
                <option key={dis.disease_id} value={dis.disease_name}>
                  {dis.disease_name}
                </option>
              ))}    
          </select>  
        </div>    
      </div>   
      <div className="col-lg-4 col-sm-6">
        <div className="diagnosis mx-sm-4 mx-lg-4">
          <p>2nd Clinical Diagnosis</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              setImpressions((prev) => ({
                ...prev,          
                second: e.target.value,
              }))                                            
            }   
          >
            {diseases.data.length > 0 &&
              diseases.data.map((dis) => (
                <option key={dis.disease_id} value={dis.disease_name}>
                  {dis.disease_name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="col-lg-4 col-sm-6">
        <div className="diagnosis">
          <p>3rd Clinical Diagnosis</p>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              setImpressions((prev) => ({
                ...prev,             
                third: e.target.value,
              }))   
            }   
          >   
            {diseases.data.length > 0 &&
              diseases.data.map((dis) => (
                <option key={dis.disease_id} value={dis.disease_name}>
                  {dis.disease_name}             
                </option>
              ))}                         
          </select>
        </div>
      </div>
    </div>
  );
};

export default Impressions;
