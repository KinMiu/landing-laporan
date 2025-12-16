import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {PublicCampusDataProvider} from "./contexts/PublicCampusDataContext"; // Import PublicCampusDataProvider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Program from "./pages/Program";
import HKI from "./pages/HKI";
import Paten from "./pages/Paten";
import DesainIndustri from "./pages/DesainIndustri";
import Hasbi from "./pages/Hasbi";
import Anyaman from "./pages/Ayaman";
import Emping from "./pages/Emping";
import Ulekan from "./pages/Ulekan";
import Lumpia from "./pages/Lumpia";
import Wisata from "./pages/Wisata";
import Aparatur from "./pages/Aparatur";
import Pelaporan from "./pages/Pelaporan";
import ActivityPage from "./pages/activity";

function App() {
  return (
    <PublicCampusDataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/tentang" element={<About />} />
              <Route path="/aparatur" element={<Aparatur />} />
              <Route path="/wisata" element={<Wisata />} />
              <Route path="/hasbi" element={<Hasbi />} />
              <Route path="/anyaman" element={<Anyaman />} />
              <Route path="/emping" element={<Emping />} />
              <Route path="/activity" element={<ActivityPage />} /> */}
              <Route path="/" element={<Pelaporan />} />
              {/* <Route path="/emping" element={<Emping />} />
              <Route path="/ulekan" element={<Ulekan />} />
              <Route path="/lumpia" element={<Lumpia />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PublicCampusDataProvider>
  );
}

export default App;
