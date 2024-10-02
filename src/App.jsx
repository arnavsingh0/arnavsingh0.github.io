import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects, Education, Skills, Research, Experience, AcademicProjects } from "./pages";

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/education' element={<Education />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/research' element={<Research />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/academic-projects' element={<AcademicProjects />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
