import { NavLink } from 'react-router-dom';

function Header({ user }) {
  return (
    <header>
      <NavLink to="/blog">Smart Blog</NavLink>
      <nav>
        <NavLink to="/blog">내 블로그</NavLink>
        <NavLink to="/write">글쓰기</NavLink>
      </nav>
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width={32} height={32} />
          <span>{user.login}</span>
        </div>
      )}
    </header>
  );
}

export default Header;
