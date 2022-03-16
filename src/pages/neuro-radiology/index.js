import React from "react";
import './neuro-radiology.css'
import Header from "../../components/Header";
import Findings from "../../components/NeuroRadiology/Findings";
import Impressions from "../../components/NeuroRadiology/Impressions";

const index = () => {
  return (
    <>
      <Header />
      <section class="body">
        <div class="container">
          <div class="row">
            <div class="inner-wrap">
              <div class="heading d-flex justify-content-between">
                <p>
                  {" "}
                  Brain Pathologies : <a href="/">Study ID : 001041</a>
                </p>
                <p>
                  {" "}
                  Patient Age :<a href="/">45</a>
                </p>
              </div>
              <Findings />
              <Impressions />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
