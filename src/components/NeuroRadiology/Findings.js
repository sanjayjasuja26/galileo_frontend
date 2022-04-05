import React from "react";

const Findings = () => {
  return (
    <div className="findings row">
      <div className="col-lg-6">
        <div className="inner-cover">
          <div>
            <h5>Findings</h5>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>flair</strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Increased</span>
              </div>
              <div className="cat">
                <span>Normal</span>
              </div>
              <div className="cat">
                <span>Decreased</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>T2</strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Increased</span>
              </div>
              <div className="cat">
                <span>Normal</span>
              </div>
              <div className="cat">
                <span>Decreased</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>T1</strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Increased</span>
              </div>
              <div className="cat">
                <span>Normal</span>
              </div>
              <div className="cat">
                <span>Decreased</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Contrast Enhancement </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Yes</span>
              </div>
              <div className="cat">
                <span>No</span>
              </div>

              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Susceptibility Artifact </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Yes</span>
              </div>
              <div className="cat">
                <span>No</span>
              </div>

              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Diffusion </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Restricted</span>
              </div>
              <div className="cat">
                <span>Normal</span>
              </div>

              <div className="cat">
                <span>Facilitated</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="right-cover">
          <div>
            <h5>Findings</h5>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Size </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>1 cm</span>
              </div>
              <div className="cat">
                <span>1 - 3 cm</span>
              </div>
              <div className="cat">
                <span> 3 cm</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Mass effect </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Positive</span>
              </div>
              <div className="cat">
                <span>None</span>
              </div>
              <div className="cat">
                <span>Negtive (atrophy)</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Number of Lesions </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Single</span>
              </div>               
              <div className="cat">
                <span>Multiple</span>
              </div>             
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>                   
          <div className="types d-flex">
            <div className="w-25">
              <strong>Dominant Pattern </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Homogeneous </span>
              </div>
              <div className="cat">
                <span>Ring</span>
              </div>
              <div className="cat">
                <span>Heterogeneous </span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          <div className="types d-flex">
            <div className="w-25">
              <strong>Side </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Left</span>
              </div>
              <div className="cat">
                <span>Right</span>
              </div>  
              <div className="cat">
                <span>Bilateral Symmetric</span>
              </div> 
              <div className="cat">
                <span>Bilateral Asymmetric</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div>
          {/* <div className="types d-flex">
            <div className="w-25">
              <strong>Diffusion </strong>
            </div>
            <div className="w-75 d-flex">
              <div className="cat">
                <span>Restricted</span>
              </div>
              <div className="cat">
                <span>Normal</span>
              </div>

              <div className="cat">
                <span>Facilitated</span>
              </div>
              <div className="cat">
                <span>N/A</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="col-lg-12 types d-flex location">
        <div className="w-25">
          <strong>Location</strong>
        </div>
        <div className="w-75 d-flex">
          <div className="cat">
            <span>Cortical Gray Matter</span>
          </div>
          <div className="cat">
            <span>Cerebral White Matter</span>
          </div>
          <div className="cat">
            <span>Deep Gray White Matter</span>
          </div>
          <div className="cat">
            <span>Brain Stem</span>
          </div>
          <div className="cat">
            <span>Intraventricular</span>
          </div>
          <div className="cat">
            <span>Extracerebral</span>
          </div>
          <div className="cat">
            <span>N/A</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Findings;
