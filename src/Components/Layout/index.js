import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import css from './index.module.css';

const Layout = function ({ children }) {
  return (
    <main className={css.main}>
      <Header />
      <section className={css.layout}>{children}</section>
      <Footer />
    </main>
  );
};
export default Layout;
