import { Link } from "react-router-dom";

export function Menu() {
  return (
    <>
      this is menu
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-property">Add Property</Link>
        </li>
        <li>
          <Link to="/view-property">View Property</Link>
        </li>
      </ul>
    </>
  );
}
