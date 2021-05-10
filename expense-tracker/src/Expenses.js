import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "./App.css"
import "react-datepicker/dist/react-datepicker.css"
import { FormGroup, Container, Form, Button, Table, Input, Label} from 'reactstrap'
import { Link } from "react-router-dom"
export default class Expenses extends Component {

    // @GeneratedValue in Spring for auto gen ids?
    //     {
    //     "id": 102,
    //     "expenseDate": "2021-06-13T17:00:00Z",
    //     "description": "Client Drinks",
    //     "amount": 5.99,
    //     "category": {
    //         "id": 3,
    //         "name": "Internet"
    //     }
    // } 

    emptyItem = { // template for post req
        description : "",
        id: '103', // need to generate values here to keep adding...
        expenseDate : new Date(),
        amount : 10.00,
        category : { id: 3, name : "Internet" }
    }

    constructor(props) {
        super(props)
        this.state = { 
            date : new Date(),
            isLoading : true,
            Expenses : [],
            Categories : [],
            item : this.emptyItem // saving the data into our state
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    async handleSubmit(event) {
        
        const item = this.state.item;
        await fetch(`/api/expenses`, {
            method : "POST",
            headers : {
                "Accept" : 'application/json',
                "Content-Type" : "application/json"
            },
            body : JSON.stringify( item ) // converts to JSON obj
        })
        event.preventDefault(); //keep form from auto submitting
        this.props.history.push("/expenses")
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name // gets us the value of our form
        let item = { ...this.state.item }
        item[name] = value
        this.setState( { item } )
    }

    handleDateChange(date) {
        let item = { ...this.state.item }
        item.expenseDate = date // update the expenseDate with our form value for date
        this.setState( { item } )
    }

    //async remove method - delete call to api
    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method : "DELETE",
            headers : {
                "Accept" : 'application/json',
                "Content-Type" : "application/json"
            } // be careful with all of the ({ here }) caused errors when out of order and hard to catch!
        }).then( () => {
            let updatedExpenses = [ ...this.state.Expenses ].filter( ele => ele.id !== id)
            this.setState( { Expenses : updatedExpenses })
        })
    }


    //async function to get our api data
    async componentDidMount() {
        const response = await fetch('/api/categories')
        const body = await response.json();
        this.setState( { Categories : body, isLoading : false } )

        const responseExpense = await fetch('/api/expenses')
        const bodyExpense = await responseExpense.json();
        this.setState( { Expenses : bodyExpense, isLoading : false } )
    }

    render() {
        const title = <h1>Add Expense</h1>
        const { Categories } = this.state //just two variables in one line
        const { Expenses, isLoading } = this.state; 

        if(isLoading) return <div>Loading...</div> // until the api call completes..

        let categoryOptions = Categories.map(category => <option key={category.id} id={category.id}>{category.name}</option>)

        let rows = Expenses.map(exp => 
                    <tr key={exp.id}>
                        <td>{exp.description}</td>
                        <td>{exp.expenseDate.substring(0, 10)}</td>
                        <td>{exp.category.name}</td>
                        <td>{exp.amount}</td>
                        {/* <td>{exp.id}</td> */}
                        <td><Button size="sm" color="danger" onClick={()=> this.remove(exp.id)}>delete</Button></td>
                    </tr>)

        return (
            <div >
                <Container id="main-cont">
                    {title}
                    <Form id="expense-form" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="description" placeholder="Memory Card">Description</Label>
                            <Input type="text" name="description" id="description" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="category">Category</Label>
                                <Input type="select">
                                    {categoryOptions}
                                </Input>
                        </FormGroup>

                         <FormGroup>  { /* Check For Errors Here If No Submit */ }
                            <Label htmlFor="amount">Amount</Label>
                            <Input type="number" min="0" max="10000" step="any" name="amount" id="location" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <br></br>
                            <Label htmlFor="expenseDate">Expense Date</Label>
                            <DatePicker selected={this.state.item.expenseDate} onChange={this.handleDateChange}/>                      
                        </FormGroup>

                        <FormGroup>
                            <br></br>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
                
                
                <Container className="expense-container">
                    <h2>Expense List</h2>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">Description</th>
                                <th width="30%">Date</th>
                                <th width="20%">Categories</th>
                                <th width="20%">Amount</th>
                                <th width=""></th>
                            </tr>
                        </thead>
                        <tbody>  
                            {rows}
                        </tbody>

                    </Table>
                </Container>
                </div>
            
        )
    }
}
