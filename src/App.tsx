import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle.ts';  // Explicit extension
import Home from './pages/Home.tsx';                    // Explicit extension
import BuyNow from './pages/BuyNow.tsx';                
import SubmitDetails from './pages/SubmitDetails.tsx';



// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { GlobalStyle } from './styles/GlobalStyle'; // ✅ MATCHES named export
// import Home from './pages/Home';                    // ✅ Case-sensitive
// import BuyNow from './pages/BuyNow';
// import SubmitDetails from './pages/SubmitDetails';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyNow />} />
        <Route path="/submit-details" element={<SubmitDetails />} />
      </Routes>
    </>
  );
};

export default App;
