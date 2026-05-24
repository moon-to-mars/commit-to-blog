import { useState, useEffect } from 'react';

function RepoSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setRepos([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/github/repos?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
          setIsOpen(true);
        })
        .catch(() => {});
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  function handleSelect(repo) {
    setQuery(repo.full_name);
    setIsOpen(false);
    onSelect(repo);
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="저장소를 검색하세요"
      />
      {isOpen && (
        <ul>
          {repos.length === 0 ? (
            <li>일치하는 저장소가 없습니다.</li>
          ) : (
            repos.map((repo) => (
              <li key={repo.full_name} onClick={() => handleSelect(repo)}>
                {repo.full_name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default RepoSearch;
