import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CASE_LIMIT } from "../../constants";
import { updatePage } from "../../redux/action/cases";

const NumericPagination = () => {

  const limit = CASE_LIMIT;

  const dispatch = useDispatch();
  const { cases: { page, total: totalRecords }} = useSelector(state => state.cases);

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalRecords / limit); i++) {
    pages.push(i);
  }
  
  console.log(page);
  const handleClick = (num) => { 
    dispatch(updatePage({ page: num }));
  };

  const handleNextbtn = () => {

    let skip = 1;
    dispatch(updatePage({page: page + skip}));

    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + skip);
      setminPageNumberLimit(minPageNumberLimit + skip);
    }
  };

  const handlePrevbtn = () => {

    let skip = 1;
    dispatch(updatePage({page: page - skip}));

    if ((page - 1) % limit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - skip);
      setminPageNumberLimit(minPageNumberLimit - skip);
    }              
  };

  const renderPageNumbers = pages.map((number) => { 
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) { 
         
      return (
        <button       
          key={number}             
          onClick={e => {    
            e.preventDefault();                 
            handleClick(number);       
          }}              
          className={`${number === page && "active"}`}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (             
        <button 
            onClick={e => {
                e.preventDefault();   
                if(page < pages[pages.length - 1]) handleNextbtn()
                handleNextbtn();          
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
          if(page > pages[0]) handlePrevbtn()
          handlePrevbtn()           
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