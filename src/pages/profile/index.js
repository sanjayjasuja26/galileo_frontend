import React from "react";
import './profile.css';
import { EditProfileIconSVG } from "../../assets/svgComponents";
import Header from "../../components/Header";

const index = () => {
  return (
    <>
      <Header />
      <section className="body">
        <div className="container">
          <div className="row">
            <div className="inner-wrap col-lg-6 bg-white mx-auto profile">
              <div className="wrap">
                <div className="text-center">
                  <EditProfileIconSVG />
                </div>
                <div className="form mt-3">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      First Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Institutional email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                </div>
                <button type="button" className="btn btn-primary">
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>  
      </section>
    </>
  );
};

export default index;
