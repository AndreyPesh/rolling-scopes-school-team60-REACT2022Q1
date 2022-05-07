import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="/main">Main</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
            <li>
              <Link to="/edit_profile">edit profile</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
