import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CASE_LIMIT } from '../../constants';
import { updatePage } from '../../redux/action/cases';

const Pagination = () => {

  const dispatch = useDispatch();
  const { cases } = useSelector(state => state.cases);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if(cases.total > 0){
      let p = Math.ceil(cases.total/CASE_LIMIT);
      let paginatItems = [];
      for(let i = 1; i <= p; i++){
        paginatItems.push(i)
      }
      setPages(paginatItems);
    }
  }, [cases])
  
  return (
    <div className='pagination'>
        <button className="prev_arrow">
            <i className="bi bi-chevron-left"></i>
        </button>
        {
          pages.map(page => (
            <button className={page === cases.page ? 'active' : ''} key={page} onClick={() => dispatch(updatePage(page))}>{page}</button>
          ))
        }   
        <button className="next_arrow">     
            <i className="bi bi-chevron-right"></i>   
        </button>                    
    </div>
  )
}

export default Pagination;