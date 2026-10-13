import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="page not-found">
      <h1>This page is not on the site.</h1>
      <p>
        <Link to="/">Back to Arnav Singh</Link>
      </p>
    </main>
  );
};

export default NotFound;
