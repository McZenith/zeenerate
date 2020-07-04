import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/App';

const baseURL = window.__BASEURL__;
const locale = window.__LOCALE__;




ReactDOM.render(
  <Suspense fallback={'...loading'}>
    <I18nextProvider i18n={i18n(locale)}>
      <App />
    </I18nextProvider>
  </Suspense>,
  document.getElementById('root'),
);
