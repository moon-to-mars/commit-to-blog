import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>Header (준비 중)</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
