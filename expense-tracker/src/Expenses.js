import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "./App.css"
import "react-datepicker/dist/react-datepicker.css"
import { FormGroup, Container, Form, Button } from 'reactstrap'
import { Link } from "react-router-dom"
export default class Expenses extends Component {

    state = { 
        date : new Date(),
        isLoading : true,
        expenses : [],
        Categories : []
    }

    //async function to get our api data
    async componentDidMount() {
        const response = await fetch('/api/categories')
        const body = await response.json();

        this.setState( { Categories : body, isLoading : false } )
    }

    render() {

        const title = <h1>Add Expense</h1>
        const { isLoading, Categories } = this.state //just two variables in one line

        if(isLoading) return <div>Loading...</div> // until the api call completes..


        let categoryOptions = Categories.map(category => <option id={category.id}>{category.name}</option>)

        return (
            <div id="expense-form">
                <Container>
                    {title}
                    <Form>
                        <FormGroup>
                            <label for="title">Title</label>
                            <input type="text" name="title" id="title" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label for="category">Category</label>
                                <select>
                                    {categoryOptions}
                                </select>
                            {/* <input type="text" name="category" id="category" onChange={this.handleChange}/> */}
                        </FormGroup>

                        <FormGroup>
                            <label for="expenseDate">Expense Date</label>
                            <DatePicker selected={this.state.date} onChange={this.handleChange}/>                        
                        </FormGroup>

                        <FormGroup>
                            <label for="location">Location</label>
                            <input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
