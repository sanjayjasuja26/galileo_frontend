import React from 'react';

const Pagination = () => {
  return (
    <div className='pagination'>
        <button className="prev_arrow">
            <i className="bi bi-chevron-left"></i>
        </button>
        <button className="active">1</button>  
        <button >2</button>
        <button >3</button>        
        <button className="next_arrow">     
            <i className="bi bi-chevron-right"></i>   
        </button>
    </div>
  )
}

export default Pagination;