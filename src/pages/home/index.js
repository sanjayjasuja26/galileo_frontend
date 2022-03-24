import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './home.css';
import NoAccess from '../../components/Access/NoAccess';
import PartialAccess from '../../components/Access/PartialAccess';
import PartialAccessVerify from '../../components/Access/PartialAccessVerify';
import Header from '../../components/Header';
import HomeTable from '../../components/Tables/HomeTable';
import { HomePageAccess } from '../../constants';

const Home = () => {

  const [section, setSection] = useState(HomePageAccess.PARTIAL_VERIFY_ACCESS);
  const { access } = useSelector(state => state.auth);

  console.log(access);
  
  const renderSection = () => {
    switch(section){
      case HomePageAccess.NO_ACCESS:
        return <NoAccess />
      case HomePageAccess.PARTIAL_ACCESS:
        return <PartialAccess />
      case HomePageAccess.PARTIAL_VERIFY_ACCESS:
        return <PartialAccessVerify />
      default:
        return <PartialAccessVerify />
    }
  }

  return (
    <>
      <Header />
      <section className="body">
        <div className="container">
            <div className="row">
              <div className="inner-wrap">
                  <div className="heading">
                      <p>Neuroradiology Module : <a href="/">Brain Pathologies</a></p>
                  </div>
                  {
                    section !== HomePageAccess.NO_ACCESS &&
                    <HomeTable />
                  }
                  { renderSection() }
              </div>
            </div>
        </div>
      </section>    
    </>
  )
}

export default Home