import React from 'react'
import './cssRules/Body.css'

function Body() {
  return (
    <div className='body'>
        <div className='rule'>
              <div className='msButtonMenuFont'>
                    <div className='ButtonMenuLinkCircle' onClick={() => alert('Link Clicked!')}>
                        <div className='ButtonMenuFont'>
                            קישורים
                        </div>
                    </div>
            </div>

            <div className='msButtonMenuFont'>
                    <div className='ButtonMenuLinkCircle' onClick={() => alert('Link Clicked!')}>
                        <div className='ButtonMenuFont'>
                            קישורים
                        </div>
                    </div>
            </div>
            
            <div className='msButtonMenuFont'>
                <div className='ButtonMenuLinkCircle' onClick={() => alert('Link Clicked!')}>
                    <div className='ButtonMenuFont'>
                        פניות
                    </div>
                </div>
                
    
            </div> 
            
        </div>
        
      Body
    </div>
  )
}

export default Body
