import React from 'react'
import Header from '../../components/Header';
import CaseTable from '../../components/Tables/CaseTable';

const index = () => {
  return (
    <>
        <Header />
        <section class="body">
   <div class="container">
       <div class="row">
        <div class="inner-wrap">
            <div class="heading">
                <p>Neuroradiology Module : <a href="/">Brain Pathologies</a></p>
            </div>
            <CaseTable />   
        </div>
       </div>
   </div>
  </section>
    </>
  )
}

export default index