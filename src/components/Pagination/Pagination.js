import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CASE_LIMIT } from "../../constants";
import { updatePage } from "../../redux/action/cases";

const NumericPagination = () => {

  const limit = CASE_LIMIT;

  const dispatch = useDispatch();
  const { cases: { page, total: totalRecords }} = useSelector(state => state.cases);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(limit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalRecords / limit); i++) {
    pages.push(i);
  }
    
  const handleClick = (num) => { 
    dispatch(updatePage({ page: num }));
  };
  
  const renderPageNumbers = pages.map((number) => {    
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {      
      return (
        <button
          key={number}
          onClick={e => {
            e.preventDefault();              
            handleClick(number)
          }}
          className={`${page === number && "active"}`}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    dispatch(updatePage({page: page + 1}));

    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + limit);
      setminPageNumberLimit(minPageNumberLimit + limit);
    }
  };

  const handlePrevbtn = () => {
    dispatch(updatePage({page: page - 1}));

    if ((page - 1) % limit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - limit);
      setminPageNumberLimit(minPageNumberLimit - limit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
        <button 
            onClick={e => {
                e.preventDefault();    
                handleNextbtn();          
                if(page < pages[pages.length - 1]) handleNextbtn()
            }}
        > 
            &hellip;
        </button>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button 
        onClick={e => {
          e.preventDefault();   
          handleNextbtn()           
          if(page > pages[0]) handlePrevbtn()
        }}
      > 
        &hellip;
      </button>
    );
  }

  return(
    <div className="pagination">
            <button 
                className="prev_arrow"
                onClick={e => {
                  e.preventDefault()
                  if(page > pages[0]) handlePrevbtn()
                }}
            >
                <i className="bi bi-chevron-left"></i>
            </button>

            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <button
                className="next_arrow"
                onClick={e => 
                    {
                        e.preventDefault();
                        if(page < pages[pages.length - 1]) handleNextbtn()
                    }
                }
            >
                <i className="bi bi-chevron-right"></i>   
            </button>
    </div>
  )
}

export default NumericPagination;