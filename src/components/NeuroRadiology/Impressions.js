import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  GreenCheckIconSVG,
  RedCheckIconSVG,
  YellowCheckIconSVG,
} from "../../assets/svgComponents";

const Impressions = ({ impressions, setImpressions }) => {
  const { diseases, singleCase } = useSelector((state) => state.cases);
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className="impression row">
      <div>
        <h5>impressions</h5>
      </div>
      <div className="col-lg-4 col-sm-6">
        <div className="diagnosis">
          <p>1st Clinical Diagnosis</p>
          <input
            type="search"
            className="form-select"
            onChange={(e) => {
              setImpressions((prev) => ({
                ...prev,
                first: e.target.value,
              }));
              setFilteredData(
                diseases.data.filter((dis) =>
                  dis.disease_name.toLowerCase().includes(e.target.value)
                )
              );
            }}
          />
          {singleCase && impressions?.first && (
            <small>
              {singleCase.known_ddx.toLowerCase() ===
              impressions.first.toLowerCase() ? (
                <GreenCheckIconSVG />
              ) : singleCase.acceptable_diagnosis1.toLowerCase() ===
                  impressions.first.toLowerCase() ||
                singleCase.acceptable_diagnosis2.toLowerCase() ===
                  impressions.first.toLowerCase() ||
                singleCase.acceptable_diagnosis3.toLowerCase() ===
                  impressions.first.toLowerCase() ? (
                <YellowCheckIconSVG />
              ) : (
                <RedCheckIconSVG />
              )}
            </small>
          )}

          {impressions?.first && filteredData.length > 0 && (
            <div className="serach-result">
              {filteredData.map((dis) => {
                return <div key={dis.disease_id}>{dis.disease_name}</div>;
              })}
            </div>
          )}
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
