import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./home.css";
import NoAccess from "../../components/Access/NoAccess";
import PartialAccess from "../../components/Access/PartialAccess";
import PartialAccessVerify from "../../components/Access/PartialAccessVerify";
import Header from "../../components/Header";
import HomeTable from "../../components/Tables/HomeTable";
import { HomePageAccess } from "../../constants";
import FullAccess from "../../components/Access/FullAccess";
import { useLocation } from "react-router-dom";
import { varifyEmailLink } from "../../redux/action/auth";

const Home = () => {
  const location = useLocation();
  const [section, setSection] = useState("");
  const { access, user } = useSelector((state) => state.auth);

  console.log(location.state);
  useEffect(() => {
    if (
      location.state &&
      location.state.for &&
      location.state.code &&
      location.state.for === "email-verify"
    ) {
      varifyEmailLink(location.state.code);
    }
  }, [location.state]);

  useEffect(() => {
    if (access === "N") {
      setSection(HomePageAccess.NO_ACCESS);
    } else if (access === "Y" && user.verify) {
      setSection(HomePageAccess.FULL_ACCESS);
    } else if (access === "P") {
      setSection(HomePageAccess.PARTIAL_ACCESS);
    } else {
      setSection(HomePageAccess.PARTIAL_VERIFY_ACCESS);
    }
  }, [access, user]);

  const renderSection = () => {
    switch (section) {
      case HomePageAccess.NO_ACCESS:
        return <NoAccess />;
      case HomePageAccess.PARTIAL_ACCESS:
        return <PartialAccess />;
      case HomePageAccess.PARTIAL_VERIFY_ACCESS:
        return <PartialAccessVerify />;
      case HomePageAccess.FULL_ACCESS:
        return <FullAccess />;
      default:
        return <PartialAccessVerify />;
    }
  };

  return (
    <>
      <Header />
      <section className="body">
        <div className="container">
          <div className="row">
            <div className="inner-wrap">
              <div className="heading">
                <p>
                  Neuroradiology Module : <a href="/">Brain Pathologies</a>
                </p>
              </div>
              {section === HomePageAccess.PARTIAL_ACCESS ||
              section === HomePageAccess.PARTIAL_VERIFY_ACCESS ? (
                <HomeTable />
              ) : (
                ""
              )}
              {renderSection()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
