import React from 'react';

const Pagination = () => {
  return (
    <div className='pagination'>
        <button>
            <i className="bi bi-chevron-left"></i>
        </button>
        <button>1</button>  
        <button>2</button>
        <button>3</button>        
        <button>     
            <i className="bi bi-chevron-right"></i>   
        </button>
    </div>
  )
}

export default Pagination;