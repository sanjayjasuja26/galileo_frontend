import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import AllCasesTable from "../Tables/AllCasesTable";

const CaseAccess = () => {

  const { cases, loading, error } = useSelector(state => state.cases);

  // if(loading){
  //   return <div className="text-center"><Loader /></div> 
  // } else 
  if(cases?.data?.length > 0){
    return <AllCasesTable cases={cases.data} />
  } else if(error){
    return <p className="text-center">{error}</p>
  } else {
    return ''
  }
};

export default CaseAccess;
