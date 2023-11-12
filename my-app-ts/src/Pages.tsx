import Home from './routes/home';
import NoMatch from './routes/NoMatch';
import { Routes, Route, Link, useResolvedPath, useMatch } from 'react-router-dom';
import './App.css';
import LoginForm from './routes/LoginForm';
import AddContents from './routes/addcontents';
import Github from './routes/sidecontents/contents/Github';
import FetchPut from './routes/FetchPut';
import Contents from './routes/Contents';
import Oscommand from './routes/sidecontents/contents/oscommand';
import Git from './routes/sidecontents/contents/Git';
import HtmlCss from './routes/sidecontents/contents/HtmlCss';
import Javascript from './routes/sidecontents/contents/Javascript';
import React from './routes/sidecontents/contents/React'
import Typescript from './routes/sidecontents/contents/Typescript';
import Sql from './routes/sidecontents/contents/Sql';
import Docker from './routes/sidecontents/contents/Docker'
import Go from './routes/sidecontents/contents/Go';
import HttpServer from './routes/sidecontents/contents/HttpServer';
import Rdbms from './routes/sidecontents/contents/Rdbms';
import UnitTest from './routes/sidecontents/contents/UnitTest';
import FrontBack from './routes/sidecontents/contents/FrontBack';
import Ci from './routes/sidecontents/contents/Ci';
import Cd from './routes/sidecontents/contents/Cd';
import Authentication from './routes/sidecontents/contents/Authentication';
import SignUp from './routes/SingUp';
import Others from './routes/sidecontents/contents/Others';


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
            <Route path="/OSコマンド(とシェル)" element={<Oscommand />} />
            <Route path="/Git" element={<Git />} />
            <Route path="/Github" element={<Github />} />
            <Route path="/HTML & CSS" element={<HtmlCss />} />
            <Route path="/JavaScript" element={<Javascript />} />
            <Route path="/React" element={<React />} />
            <Route path="/React x Typescript" element={<Typescript />} />
            <Route path="/SQL" element={<Sql />} />
            <Route path="/Docker" element={<Docker />} />
            <Route path="/Go" element={<Go />} />
            <Route path="/HTTP Server(Go)" element={<HttpServer />} />
            <Route path="/RDBMS(MySQL)への接続(Go)" element={<Rdbms />} />
            <Route path="/Unit Test(Go)" element={<UnitTest />} />
            <Route path="/フロントエンドとバックエンドの接続" element={<FrontBack />} />
            <Route path="/CI(Continuous Integration)" element={<Ci />} />
            <Route path="/CD(Continuous Delivery/Deployment)" element={<Cd />} />
            <Route path="/認証" element={<Authentication />} />
            <Route path="/その他" element={<Others />} />
            <Route path="/addcontents" element={<AddContents />} />
            <Route path="*" element={<FetchPut />} />
            <Route path="/contents/*" element={<Contents />} />
            <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div> 
  ); 
}

export default Pages;