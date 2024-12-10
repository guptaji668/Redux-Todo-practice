import React from 'react'
import "./modal.css"

export default function CustomModal({onClose,data}) {
console.log("dataaa",data)

  return (
    <div className='custom-modal' >
        <div className='custom-container'>
            
            <div className='modal-content'>
               
                    {
                        data?.map((item,i)=>{
                            return(
                                <div key={i} className='header'>
                                <h2>{item?.title}</h2>
                                <p>{item?.description}</p>
                               </div>
                            )
                            
                        })
                    }

            <div className='bottom-content'>
                <button onClick={onClose} className='close-btn'>cancel</button>
                <button onClick={onClose} className='save-btn'>save</button>

            </div>
                
               


            </div>

        </div>

    </div>
  )
}
