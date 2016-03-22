import React from 'react';


export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    let imageSrc = require('../../../assets/images/bg/bg.jpg');
    return (
      <div>
        <h1>Contact</h1>
        <img src={imageSrc} alt="Bg"/>
      </div>
    );
  }
}
