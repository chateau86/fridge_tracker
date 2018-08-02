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

    this._update = this._update.bind(this);
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
        this._update();
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
        this._update();
      });
  }

  _update() {
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

        <table>
          { this.state.foodItems.map((food, i) => (
            <tr key={i}>
              <td>{food._id} </td>
              <td>{food.name} </td>
              <td>{food.quantity} </td>
              <td>{food.unit} </td>
              <td>{food.price_per_unit} </td>
              <td>{food.date_warn.substring(0, 10)}</td>
              <td>{food.date_expire.substring(0, 10)} </td>
              <td><button onClick={() => this.deleteItem(i)}>x</button></td>
            </tr>
          )) }
        </table>

        <button onClick={this.newCounter}>New counter</button>
      </>
    );
  }
}

export default Fridge;
