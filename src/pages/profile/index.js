import React from "react";
import './profile.css';
import { EditProfileIconSVG } from "../../assets/svgComponents";
import Header from "../../components/Header";

const index = () => {
  return (
    <>
      <Header />
      <section class="body">
        <div class="container">
          <div class="row">
            <div class="inner-wrap col-lg-6 bg-white mx-auto profile">
              <div class="wrap">
                <div class="text-center">
                  <EditProfileIconSVG />
                </div>
                <div class="form mt-3">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      First Name
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Last Name
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Institutional email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                </div>
                <button type="button" class="btn btn-primary">
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
