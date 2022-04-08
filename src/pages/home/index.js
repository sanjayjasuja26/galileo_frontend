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
import { fetchCases, setCasesPaginationIndex } from "../../redux/action/cases";

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
    dispatch(setCasesPaginationIndex({ page: cases.page, access }));
  }, [dispatch, access, cases.page])     

  useEffect(() => {
    const paginationIndex = cases.paginationIndex;
    const page = cases.page;

    if(paginationIndex && page){

      let body = { page: page, access };

      if(paginationIndex.length > 0){
        paginationIndex.filter(rec => {
          if(rec.index === page){
            body = {
              ...body, 
              startAt: rec.start
            }
          }
        })
      }

      dispatch(fetchCases(body));
    }
  }, [cases.page, cases.paginationIndex, access, dispatch])

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
        </div>
      </section>
    </>
  );
};

export default Home;
