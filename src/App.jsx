import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar} from "./components"; // Import SideNavbar
import {
  About,
  Contact,
  Home,
  Projects,
  Education,
  Skills,
  Research,
  Experience
} from "./pages";

// Custom component to handle conditional rendering of Navbar
const AppContent = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="min-h-screen flex flex-col"> {/* Flex container */}
      {/* Only show the Navbar if the current path is not the home page */}
      {location.pathname !== "/" && <Navbar />}

      <div className="flex-grow"> {/* Allows the content to grow and push the footer down */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/education' element={<Education />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/research' element={<Research />} />
          <Route path='/experience' element={<Experience />} />
        </Routes>
      </div>
      {location.pathname !== "/" && <Footer />} {/* Only show footer if not on home page */}
    </div>
  );
};

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <AppContent />
      </Router>
    </main>
  );
};

export default App;