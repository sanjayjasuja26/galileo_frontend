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
        title="1st"
      />               
      <InputField 
        impressions={impressions}
        filteredData={filteredData}
        setImpressions={setImpressions}
        setFilteredData={setFilteredData}      
        showChecks={showChecks}
        section="second"
        title="2nd"
      />                     
      <InputField 
        impressions={impressions}
        filteredData={filteredData}     
        setImpressions={setImpressions}
        setFilteredData={setFilteredData}
        showChecks={showChecks}
        section="third"
        title="3rd"
      />
    </div>
  );
};

export default Impressions;
