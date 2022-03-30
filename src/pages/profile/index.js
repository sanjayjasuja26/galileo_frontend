import React from "react";
import './profile.css';
import { EditProfileIconSVG } from "../../assets/svgComponents";
import Header from "../../components/Header";
import EditProfile from "../../components/Form/EditProfile";

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
                <EditProfile />
              </div>
            </div>
          </div>
        </div>  
      </section>
    </>
  );
};

export default index;
