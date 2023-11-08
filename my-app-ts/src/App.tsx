import React, { useEffect, useState } from 'react';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { fireAuth } from './firebase';
import ReactDOM from 'react-dom/client';
import Pages from './Pages'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);

  // ログイン状態を監視して、stateをリアルタイムで更新する
  useEffect(() => {
    onAuthStateChanged(fireAuth, (user) => {
    setLoginUser(user);
    });
    }, []);

  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </React.StrictMode>
      </Provider>
    );
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
