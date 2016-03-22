import React from 'react';

import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let Child;

    switch(this.props.route) {
      case 'about': Child = About; break;
      case 'contact': Child = Contact; break;
      case 'contact/contact': Child = Contact; break;
      default: Child = Home;
    }

    return (
      <div>
        <Child/>
      </div>
    );
  }
}
