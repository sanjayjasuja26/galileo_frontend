import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.css";                 
import Pagination from '../../components/Pagination';
import NoAccess from "../../components/Access/NoAccess";
import PartialAccess from "../../components/Access/PartialAccess";
import PartialAccessVerify from "../../components/Access/PartialAccessVerify";
import Header from "../../components/Header";
import HomeTable from "../../components/Tables/HomeTable";
import { HomePageAccess } from "../../constants";
import FullAccess from "../../components/Access/FullAccess";
import { getDataFromColection } from "../../utils/helper";

const Home = () => {
  const [section, setSection] = useState("");
  const { access, user } = useSelector((state) => state.auth);

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
        return ''; 
    }
  };

  useEffect(() => {
    getCases();
  }, [])

  const getCases = async () => {
    const data = await getDataFromColection("cases_neuro");
    console.log(data);
  }       

  return (          
    <>
      <Header />
      <section className="body">
        <div className="container mb-4">
          <div className="row">
            <div className="inner-wrap">
              <div className="heading">
                <p>
                  Neuroradiology Module : <Link to="/neuro-radiology">Brain Pathologies</Link>
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
          {
            (section === HomePageAccess.FULL_ACCESS) &&
            <Pagination />
          }
        </div>
      </section>
    </>
  );
};

export default Home;
