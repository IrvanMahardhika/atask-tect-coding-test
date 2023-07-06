import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

import Pages from 'pages';
import DocumentHead from 'containers/DocumentHead';

function App() {
  return (
    <Provider store={store}>
      <DocumentHead />
      <Pages />
    </Provider>
  );
}

export default App;
