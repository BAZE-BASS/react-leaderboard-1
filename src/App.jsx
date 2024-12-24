import React from "react";
import Header from "./Header"; // Adjust the import path based on your structure
import Footer from "./Footer"; // Adjust the import path based on your structure
import "./App.css"; // Main CSS for the app

function App() {
  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        <h2>Select Your Lucky Number</h2>
        <div className="wrapper">
          <div className="inner" style={{ "--quantity": 5 }}>
            {[...Array(5)].map((_, index) => (
              <div
                className="card"
                key={index}
                style={{
                  "--index": index,
                  "--color-card": "212, 175, 55", // Gold Color
                }}
              >
                <div className="img"></div>
                <div className="card-content">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
