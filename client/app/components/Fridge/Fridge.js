import React, { Component } from 'react';
import 'whatwg-fetch';

class Fridge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodItems: []
    };

    this.newCounter = this.newCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);

    this._modifyCounter = this._modifyCounter.bind(this);
  }

  componentDidMount() {
    fetch('/food')
      .then(res => res.json())
      .then(json => {
        this.setState({
          foodItems: json
        });
      });
  }

  newCounter() {

  }

  incrementCounter(index) {

  }

  decrementCounter(index) {

  }

  deleteCounter(index) {

  }

  _modifyCounter(index, data) {

  }

  render() {
    return (
      <>
        <p>Food items:</p>

        <ul>
          { this.state.foodItems.map((food, i) => (
            <li key={i}>
              <span>{food.name} </span>
              <button onClick={() => this.incrementCounter(i)}>+</button>
              <button onClick={() => this.decrementCounter(i)}>-</button>
              <button onClick={() => this.deleteCounter(i)}>x</button>
            </li>
          )) }
        </ul>

        <button onClick={this.newCounter}>New counter</button>
      </>
    );
  }
}

export default Home;
