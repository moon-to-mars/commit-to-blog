import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <Header user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
