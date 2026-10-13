import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const LunarRover = lazy(() => import("./pages/LunarRover"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plain" element={<Navigate to="/" replace />} />
        <Route
          path="/lunar-rover"
          element={
            <Suspense fallback={<main className="page not-found"><p>Loading the rover…</p></main>}>
              <LunarRover />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
