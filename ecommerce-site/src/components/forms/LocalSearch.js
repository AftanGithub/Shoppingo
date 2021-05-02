import React from 'react';

const LocalSearch = ({keyword,setKeyword})=>{

    const handleSearchOnChange = (e)=>{
        e.preventDefault();
     
        setKeyword(e.target.value.toLowerCase());
     
      }

    return(
       <div className="cotainer pb-2 pt-2">
            <input type="search" placeholder="filter"
         className = "form-control mb-4 p-2" 
         value={keyword} onChange={handleSearchOnChange} />
       </div>
    )
}

export default LocalSearch;