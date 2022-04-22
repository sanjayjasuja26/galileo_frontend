import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import CustomPagination from "../Pagination/CustomPagination";
import AllCasesTable from "../Tables/AllCasesTable";

const CaseAccess = () => {

  const { user, access } = useSelector(state => state.auth);
  const { cases: { loading, error, data, total } } = useSelector(state => state.cases);

  if(loading){   
    return <div className="text-center"><Loader /></div> 
  } else if(data?.length > 0){  
    return <>         
    <AllCasesTable cases={data} />
      {
        (total === 0 || access === 'P' || (access === 'Y' && !user.verify)) 
        ? null : 
        <CustomPagination />
      }
    </>
  } else if(error){
    return <p className="text-center">{error}</p>
  } else {
    return ''
  }
};

export default CaseAccess;
