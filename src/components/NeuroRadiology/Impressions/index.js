import React, { useState } from "react";
import InputField from "./InputField";

const Impressions = ({ impressions, setImpressions, showChecks }) => {
  const [filteredData, setFilteredData] = useState({
    first: [],
    second: [],   
    third: []
  });
  

  return (
    <div className="impression row">
      <div>
        <h5>impressions</h5>
      </div>
      <InputField 
        impressions={impressions}
        filteredData={filteredData}
        setImpressions={setImpressions}
        setFilteredData={setFilteredData}
        showChecks={showChecks}
        section="first"
      />
      <InputField 
        impressions={impressions}
        filteredData={filteredData}
        setImpressions={setImpressions}
        setFilteredData={setFilteredData}      
        showChecks={showChecks}
        section="second"
      />                
      <InputField 
        impressions={impressions}
        filteredData={filteredData}     
        setImpressions={setImpressions}
        setFilteredData={setFilteredData}
        showChecks={showChecks}
        section="third"
      />
    </div>
  );
};

export default Impressions;
