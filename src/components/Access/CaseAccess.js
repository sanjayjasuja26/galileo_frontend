import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import NumericPagination from "../Pagination/Pagination";
import AllCasesTable from "../Tables/AllCasesTable";

const CaseAccess = () => {

  const { cases: { loading, error, data, total }} = useSelector(state => state.cases);

  if(loading){
    return <div className="text-center"><Loader /></div> 
  } else if(data?.length > 0){
    return <>   
    <AllCasesTable cases={data} />
      {
        (total > 0) &&
        <NumericPagination />
      }
    </>
  } else if(error){
    return <p className="text-center">{error}</p>
  } else {
    return ''
  }
};

export default CaseAccess;
