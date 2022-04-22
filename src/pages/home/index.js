import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.css";                 
import NoAccess from "../../components/Access/NoAccess";
import PartialAccess from "../../components/Access/PartialAccess";
import PartialAccessVerify from "../../components/Access/PartialAccessVerify";
import Header from "../../components/Header";
import { HomePageAccess } from "../../constants";
import CaseAccess from "../../components/Access/CaseAccess";
import { fetchCases, initialAttemptCase, setCasesAccess, setCasesPaginationIndex, updatePage } from "../../redux/action/cases";

const Home = () => {    

  const dispatch = useDispatch();

  const [section, setSection] = useState("");
  const { access, user } = useSelector((state) => state.auth);
  const { cases, caseAccess } = useSelector(state => state.cases);

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
    
    // Handle Case Access
    let setCaseAccess = '';

    if(access === 'P' || (access === 'Y' && !user.verify)){
      setCaseAccess = 'Y'         
    } else {                                 
      setCaseAccess = ''
    }

    dispatch(setCasesAccess(setCaseAccess))
  }, [access, user, dispatch]);                       

  useEffect(() => {
    dispatch(updatePage({ page: cases.page }))
  }, [dispatch, cases.page])

  useEffect(() => {
    dispatch(initialAttemptCase())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(setCasesPaginationIndex({ page: cases.page, access: caseAccess }));
  }, [dispatch, caseAccess, cases.page])     

  useEffect(() => {
    const paginationIndex = cases.paginationIndex;
    const page = cases.page;
    const firstTimeDataFetch = cases.data.length > 0 ? false : true;

    if(paginationIndex && page){     

      let body = { page: page, user: user.user_email, access: caseAccess, loading: firstTimeDataFetch };

      if(paginationIndex.length > 0){
        paginationIndex.filter(rec => {
          if(rec.index === page){
            body = {                          
              ...body,                           
              startAt: rec.start
            }
          }
        })   

        dispatch(fetchCases(body));
      }

    }
  }, [cases.page, cases.paginationIndex, caseAccess, dispatch])

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
