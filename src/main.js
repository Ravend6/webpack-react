import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

function render() {
  // let route = window.location.hash.substr(1);
  let route = window.location.pathname.substr(1);
  ReactDOM.render(
    <div className="container">
      <App route={route}/>
    </div>,
    document.querySelector('.app')
  );
}

// window.addEventListener('hashchange', render);
window.addEventListener('pathchange', render);
render();

