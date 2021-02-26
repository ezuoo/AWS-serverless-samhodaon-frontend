import React, {  Suspense, useState } from 'react';
import { useLocation } from "react-router-dom";

import User from './User'
import Admin from './Admin';

function App() {
  const [IsAdmin, setIsAdmin] = useState();
  const pathname = useLocation().pathname;
  
  const checkAdmin = (pathname) => {
    pathname.split("/").indexOf("admin") !== -1 ? 
    setIsAdmin(true) : setIsAdmin(false);
  }

  React.useEffect(() => {
    checkAdmin(pathname);
  }, [pathname]);



  return (
    <Suspense fallback={<div>Loading...</div>}>
      {IsAdmin !== undefined && (IsAdmin === false ? <User /> : <Admin />) }
    </Suspense>
  );

  
}
export default React.memo(App);
