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
    this.deleteItem = this.deleteItem.bind(this);

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
    fetch(`/food/add`, { method: 'POST' })
      .then(_ => {
        this._modifyCounter(index, null);
      });
  }

  incrementCounter(index) {

  }

  decrementCounter(index) {

  }

  deleteItem(index) {
    const id = this.state.foodItems[index]._id;

    fetch(`/food/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyCounter(index, null);
      });
  }

  _modifyCounter(index, data) {
    fetch('/food')
      .then(res => res.json())
      .then(json => {
        this.setState({
          foodItems: json
        });
      });
  }

  render() {
    return (
      <>
        <p>Food items:</p>

        <ul>
          { this.state.foodItems.map((food, i) => (
            <li key={i}>
              <span>{food.name} </span>
              <button onClick={() => this.deleteItem(i)}>x</button>
            </li>
          )) }
        </ul>

        <button onClick={this.newCounter}>New counter</button>
      </>
    );
  }
}

export default Fridge;
