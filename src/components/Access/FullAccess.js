import React from "react";

const FullAccess = () => {
  return (
    <div className="study-table table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Study ID</th>
            <th scope="col">Modality</th>
            <th scope="col">Status</th>
            <th scope="col">Known Diagnosis</th>
            <th scope="col">Observation Performance</th>
            <th scope="col">Diagnosis Performance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">001037</th>
            <td>MRI</td>
            <td>Completed</td>
            <td>Abscess</td>
            <td>9/10</td>
            <td>Correct</td>
          </tr>
          <tr>
            <th scope="row">001038</th>
            <td>MRI</td>
            <td>Completed</td>
            <td>Multiple Sclerosis</td>
            <td>10/10</td>
            <td>Correct</td>
          </tr>
          <tr>
            <th scope="row">001039</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row">001040</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row">001041</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row">001042</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row">001043</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row">001044</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row">001045</th>
            <td>MRI</td>
            <td>To be done</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FullAccess;
