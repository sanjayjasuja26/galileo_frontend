import React from 'react'
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from 'react-redux';
import { CASE_LIMIT } from '../../constants';
import { updatePage } from '../../redux/action/cases';

const CustomPagination = () => {

    const dispatch = useDispatch();
    const { cases: { page, total: totalRecords }} = useSelector(state => state.cases);

    const handlePageChange = (page) => {
        dispatch(updatePage({ page }));
    }

  return (
    <div>
        <Pagination
          activePage={page}
          itemsCountPerPage={CASE_LIMIT}
          totalItemsCount={totalRecords}
          pageRangeDisplayed={4}
          onChange={handlePageChange}
        />
    </div>  
  )
}

export default CustomPagination