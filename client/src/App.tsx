import React from 'react';
import Header from './components/header/Header';
import SignalBar from './components/leftBar/SignalBar';
import Footer from './components/footer/Footer';
import PropertiesBar from './components/rightBar/PropertiesBar';
import Canvas from './components/diagram/Canvas';
import CanvasSVG from './components/diagram/CanvasSVG';

const App = () => {
  return (
    <div className={"h-screen flex flex-col"}>
        <Header/>
        <main className={"flex flex-row flex-grow overflow-auto"}>
          <SignalBar/>
          <div className={" overflow-auto w-full"}>
            <CanvasSVG/>
          </div>
          <PropertiesBar/>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
