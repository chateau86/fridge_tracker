import React, { Component } from 'react';
import 'whatwg-fetch';
import ReactTable from "react-table";

class Fridge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodItems: [],
      input_name:""
    };

    this.newCounter = this.newCounter.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteItemByID = this.deleteItemByID.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this._update = this._update.bind(this);
  }

  componentDidMount() {
    this._update();
  }

  newCounter() {
    fetch(`/food/add`, { method: 'POST' })
      .then(_ => {
        this._update();
      });
  }

  deleteItem(index) {
    const id = this.state.foodItems[index]._id;

    fetch(`/food/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._update();
      });
  }
  
  deleteItemByID(id) {
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
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      ['input_'+name]: value
    });
  }

  render() {
        const col = [
          {Header:'Name', accessor:'name'},
          {Header:'Quantity', accessor:'quantity'},
          {Header:'Unit', accessor:'unit'},
          {Header:'Price per unit', accessor:'price_per_unit'},
          {id:'total_value', Header: 'Total value', accessor:f=>(f.quantity*f.price_per_unit)},
          {id:'warn', Header:'Warning date', accessor:f=>f.date_warn.substring(0, 10)},
          {id:'expire', Header:'Expire date', accessor:f=>f.date_expire.substring(0, 10)},
          {Header:'Remove', accessor:'_id', Cell:props => <button onClick={() =>this.deleteItemByID(props.value)}>x</button>}
        ];
    return (
      <>
        <p>Food items:</p>

        
        <p>
        <input name="name" type="text" value={this.state.input_name} onChange={this.handleInputChange}/>
        <button onClick={this.newCounter}>New item</button>
        </p>
        <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css" />
        <ReactTable data={this.state.foodItems} columns={col} />
      </>

    );
  }
}

export default Fridge;
