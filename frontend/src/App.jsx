import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import WritePage from './pages/WritePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/blog" replace />} />
          <Route path="write" element={<WritePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
