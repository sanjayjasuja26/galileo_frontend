import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.css";                 
import Pagination from '../../components/Pagination/Pagination';
import NoAccess from "../../components/Access/NoAccess";
import PartialAccess from "../../components/Access/PartialAccess";
import PartialAccessVerify from "../../components/Access/PartialAccessVerify";
import Header from "../../components/Header";
import { HomePageAccess } from "../../constants";
import CaseAccess from "../../components/Access/CaseAccess";
import { fetchCases } from "../../redux/action/cases";

const Home = () => {

  const dispatch = useDispatch();

  const [section, setSection] = useState("");
  const { access, user } = useSelector((state) => state.auth);
  const { cases } = useSelector(state => state.cases);

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
        return (
          <>
            <CaseAccess />
            <PartialAccess />
          </>
        );
      case HomePageAccess.PARTIAL_VERIFY_ACCESS:
        return (
          <>
            <CaseAccess />
            <PartialAccessVerify />
          </>
        );
      case HomePageAccess.FULL_ACCESS:
        return <CaseAccess />;
      default:                  
        return ''; 
    }
  };

  useEffect(() => {
    dispatch(fetchCases({ startFrom: cases.startFrom, endAt: cases.endAt, access }));
  }, [dispatch, access, cases.startFrom, cases.endAt])     

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
              {renderSection()}
            </div>
          </div>
          {/* {
            (section === HomePageAccess.FULL_ACCESS && cases.total > 0) &&
            <Pagination />
          } */}
        </div>
      </section>
    </>
  );
};

export default Home;
