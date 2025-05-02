import React from 'react';
import HSPForm from './components/HSPForm';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header />
      <main className="p-6 bg-gray-50">
          <div className="min-h-screen bg-gray-50">
            <HSPForm />
            </div>  
      </main>
      <Footer />
    </>

  );
}

export default App;
