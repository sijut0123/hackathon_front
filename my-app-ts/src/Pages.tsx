import Home from './routes/home';
import NoMatch from './routes/NoMatch';
import Posts from './routes/posts';
import Post from './routes/post';
import PostIndex from './routes/postindex';
import { Routes, Route, Link, NavLink, useResolvedPath, useMatch } from 'react-router-dom';
import './App.css';
import LoginForm from './routes/LoginForm';
import LogoutForm from './routes/LogoutForm';


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
    );
  };

function CustomLink({ children, to }: {children: React.ReactNode, to: string}) {
    let resolved = useResolvedPath(to);
    let match = useMatch({
      path: resolved.pathname,
      end: true,
    });
    return(
        <div>
            <Link style={{ color: match ? 'blue' : '' }} to={to}>
                {children}
            </Link>
        </div>
    )
}

function Pages() {
  return (
    <div>
      <h1>Hello React Router v6</h1>
      <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/posts" element={<Layout><Posts /></Layout>}>
                <Route index element={<PostIndex />} />
                <Route path=":postId" element={<Post />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
      </Routes>
    </div> 
  ); 
}

export default Pages;