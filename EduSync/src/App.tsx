import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StudentTable from "./components/Student";

function App() {
  return (
    <div>
      <Header />
      <main>
        <h1>טבלת סטודנטים</h1>
        <StudentTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;


