import React from "react";
import { useSelector } from "react-redux";
import AllCasesTable from "../Tables/AllCasesTable";

const CaseAccess = () => {

  const { cases, loading, error } = useSelector(state => state.cases);

  if(loading){
    return (
      <div className="text-center">Loading...</div>
    )
  } else if(cases?.data?.length > 0 && !loading && !error){
    return <AllCasesTable cases={cases.data} />
  } else if(error){
    return (
      <div className="text-center">{error}</div>
    )
  } else {
    return ''
  }
};

export default CaseAccess;
