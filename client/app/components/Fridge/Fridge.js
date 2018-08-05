import React, { Component } from 'react';
import 'whatwg-fetch';
import ReactTable from "react-table";

class Fridge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foodItems: [],
            input_name:"",
            input_unit:"count",
            input_qty:1,
            input_ppu:1,
            input_warn:"2018-08-05",
            input_exp:"2018-08-06",
        };

        this.newItem = this.newItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteItemByID = this.deleteItemByID.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this._update = this._update.bind(this);
    }

    componentDidMount() {
        this._update();
    }

    newItem() {
        fetch('/food/add?'+
                'name='+this.state.input_name+
                '&qty='+this.state.input_qty+
                '&unit='+this.state.input_unit+
                '&ppu='+this.state.input_ppu+
                '&warn='+this.state.input_warn+
                '&exp='+this.state.input_exp
                , { method: 'POST' })
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
            {Header:'Unit', accessor:'unit'},
            {Header:'Quantity', accessor:'quantity'},
            {Header:'Price per unit', accessor:'price_per_unit'},
            {id:'total_value', Header: 'Total value', accessor:f=>(f.quantity*f.price_per_unit)},
            {id:'warn', Header:'Warning date', accessor:f=>f.date_warn.substring(0, 10)},
            {id:'expire', Header:'Expire date', accessor:f=>f.date_expire.substring(0, 10)},
            {Header:'Remove', accessor:'_id', Cell:props => <button onClick={() =>this.deleteItemByID(props.value)}>x</button>}
        ];
        const btn_enabled = this.state.input_name.length>0 &&
                            this.state.input_unit.length>0 &&
                            this.state.input_qty>0 &&
                            this.state.input_ppu>0;
        return (
            <>
                <p>Food items:</p>

                
                <p>
                Name:<input name="name" type="text" value={this.state.input_name} onChange={this.handleInputChange}/>
                Unit:<input name="unit" type="text" value={this.state.input_unit} onChange={this.handleInputChange}/>
                Quantity:<input name="qty" type="number" value={this.state.input_qty} onChange={this.handleInputChange}/>
                Price per unit:<input name="ppu" type="text" value={this.state.input_ppu} onChange={this.handleInputChange}/>
                Warning date (YYYY-MM-DD):<input name="warn" type="text" value={this.state.input_warn} onChange={this.handleInputChange}/>
                Expire date (YYYY-MM-DD):<input name="exp" type="text" value={this.state.input_exp} onChange={this.handleInputChange}/>
                <button disabled={!btn_enabled} onClick={this.newItem}>New item</button>
                </p>
                <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css" />
                <ReactTable
                    data={this.state.foodItems} 
                    columns={col}
                    SubComponent={row => {
                                //console.log(row);
                                  return (
                                      <div style={{ padding: "20px" }}>
                                      TODO: Edit box goes here {row.original._id}

                                      </div>
                                  );
                                 }}                
                />
            </>

        );
    }
}

export default Fridge;
