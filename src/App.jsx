import { BrowserRouter as Router } from "react-router-dom";

import { Navbar, Footer } from "./components";
import {
  Home,
  About,
  Experience,
  Projects,
  Contact,
  Skills
} from "./pages";

const App = () => {
  return (
    <main className='bg-black min-h-screen w-full'>
      <Router>
        <Navbar />
        <div className="relative z-0">
          <Home /> {/* Hero Section with 3D Background */}
          <About />
          <Experience /> {/* Now includes Education */}
          <Skills />
          <Projects /> {/* Now includes Research */}
          <Contact />
          <Footer />
        </div>
      </Router>
    </main>
  );
};

export default App;