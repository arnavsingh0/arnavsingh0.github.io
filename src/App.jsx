import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Footer, Cursor, PageLoader } from "./components";
import {
  Home,
  About,
  Experience,
  Projects,
  Contact,
  Skills
} from "./pages";

const PlainView = lazy(() => import('./pages/PlainView'));
const LunarRover = lazy(() => import('./pages/LunarRover'));

const App = () => {
  return (
    <main className='bg-black min-h-screen w-full overflow-x-hidden'>
      <Cursor />
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/plain" element={<PlainView />} />
            <Route path="/lunar-rover" element={<LunarRover />} />
            <Route path="/" element={
              <>
                <Navbar />
                <div className="relative z-0">
                  <Home /> {/* Hero Section with 3D Background */}
                  <About />
                  <Experience /> {/* Now includes Education */}
                  <Projects /> {/* Now includes Research */}
                  <Skills />
                  <Contact />
                  <Footer />
                </div>
              </>
            } />
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;