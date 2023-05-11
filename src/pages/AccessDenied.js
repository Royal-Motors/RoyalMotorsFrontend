import React from 'react';
import './AccessDenied.css';


function AccessDenied() {


  return (
    <div className="Access Denied">
        <body>
            <div className="containerAccess">
                <h1 className='h1Access' >Access Denied</h1>
                <p className='pAccess'>Sorry, you do not have permission to access this page.</p>
            </div>
        </body>
    </div>
  );
}

export default AccessDenied;