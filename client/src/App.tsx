import React from 'react';
import Header from './components/header/Header';
import SignalBar from './components/leftBar/SignalBar';
import Footer from './components/footer/Footer';
import PropertiesBar from './components/rightBar/PropertiesBar';

const App = () => {
  return (
    <div className={"h-screen flex flex-col"}>
        <Header/>
        <main className={"flex flex-row flex-grow overflow-auto"}>
          <SignalBar/>
          <div className={"flex-grow"}></div>
          <PropertiesBar/>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
