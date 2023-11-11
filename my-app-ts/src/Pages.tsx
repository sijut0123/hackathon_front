import React from 'react';
import Home from './routes/home';
import NoMatch from './routes/NoMatch';
import { Routes, Route, Link, useResolvedPath, useMatch } from 'react-router-dom';
import './App.css';
import LoginForm from './routes/LoginForm';
import AddContents from './routes/addcontents';
import Github from './routes/sidecontents/Github';
import FetchPut from './routes/FetchPut';
import Contents from './routes/Contents';


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
      <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/Github" element={<Github />} />
            <Route path="/addcontents" element={<AddContents />} />
            <Route path="*" element={<FetchPut />} />
            <Route path="/contents/*" element={<Contents />} />
      </Routes>
    </div> 
  ); 
}

export default Pages;