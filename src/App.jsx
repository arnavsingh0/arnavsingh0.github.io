import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { Navbar, Footer, Cursor, PageLoader } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";
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
const SharanyaBirthday = lazy(() => import('./pages/SharanyaBirthday'));

const isBirthdayPath = (pathname) =>
  pathname === "/sharanyabirthday21" || pathname === "/sharanyabirthday21/";

const AppShell = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!isBirthdayPath(pathname) && <Cursor />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/plain" element={<PlainView />} />
          <Route path="/lunar-rover" element={<LunarRover />} />
          <Route path="/sharanyabirthday21" element={
            <ErrorBoundary
              fallback={
                <div className="min-h-screen flex items-center justify-center p-8 text-[#8d4d63]">
                  <p>The book stumbled for a second. Refresh, Shansu.</p>
                </div>
              }
            >
              <SharanyaBirthday />
            </ErrorBoundary>
          } />
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
    </>
  );
};

const App = () => {
  return (
    <main className='bg-black min-h-screen w-full overflow-x-hidden'>
      <Router>
        <AppShell />
      </Router>
    </main>
  );
};

export default App;
