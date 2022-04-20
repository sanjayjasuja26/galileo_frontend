import React from 'react'
import { useNavigate } from 'react-router-dom';

const AllCasesTable = ({ cases }) => {     
  
  const navigate = useNavigate();

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
              {    
                cases.map(c => (
                  <tr key={c.case_id} onClick={() => navigate(`/neuro-radiology/${c.case_id}`)}>      
                      <th scope="row">{c.case_id}</th>
                      <td>{c.modality}</td>
                      <td>{c.attempted ? 'Completed' : 'To be done'}</td>
                      <td></td> 
                      <td></td>                         
                      <td></td>
                  </tr>              
                ))                            
              }     
            {/* <tr>
              <th scope="row">001037</th>
              <td>MRI</td>
              <td>Completed</td>
              <td>Abscess</td>        
              <td>9/10</td>
              <td>Correct</td>
            </tr> */}
          </tbody>
        </table>
    </div>
  )                             
}

export default AllCasesTable;