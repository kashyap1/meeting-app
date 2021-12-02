import React from 'react';
import Layout from './Components/Layout';
import Routes from './Components/Routes';

import './styles.css';

export default function App() {
  return (
    <div className="App">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}
