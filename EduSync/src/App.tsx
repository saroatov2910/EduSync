// import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <div>
      <Header />
      <main>
        {/* כאן יתווסף התוכן הראשי של האפליקציה */}
        <h2>תוכן ראשי</h2>
        <p>ברוכים הבאים לאפליקציה.</p>
      </main>
      <Footer />
    </div>
  );
};

export default App;
