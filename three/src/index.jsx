import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App3 from './test/App3';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={null}>
    <App3 />
  </Suspense>,
);
