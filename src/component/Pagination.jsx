import React, { useState } from 'react'

export default function Pagination({item}) {
const [page,setPage]=useState(1)
const[perPageItem,setPerPageItem]=useState(5)

const totalpage=Math.ceil(item?.length/perPageItem)
const handlePageChange=(pageNumber)=>{
    if(pageNumber>0){
        setPage(pageNumber)
    }
}
const handlePerPageChange=(e)=>{
    setPerPageItem(e.target.value)
    setPage(1)
}

const startInd=(page-1)*perPageItem
const currItem=item?.slice(startInd,startInd+perPageItem)


  return (
    <div className=''>
        <ul>
            {
                currItem?.map((item,i)=>{
                    return <li key={i}>{item}</li>
                })
            }
        </ul>

        <div>
            <label>Select ITem Per Page</label>
            <select value={perPageItem} onChange={handlePerPageChange}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                
            </select>
        </div>

        <button onClick={()=>handlePageChange(page+1)}>
            next page
        </button>
        <button onClick={()=>handlePageChange(page-1)}>
            previous 
        </button>
        
    </div>
  )
}
