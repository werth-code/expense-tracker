import React, { Component } from 'react'
export default class Category extends Component {

    state = {
        isLoading : true,
        Categories : []
    }
    // sync - we wait for a response.
    // async - we don't wait, but when we get a response we do something.

    async componentDidMount() {
        const response = await fetch('/api/categories')
        const body = await response.json()
        this.setState({ Categories : body, isLoading : false }) //set the state to the response and isLoading to false
    }

    render() {

        const { Categories, isLoading } = this.state; 
        if(isLoading) return (<div>Loading...</div>)

        return (
            <div>
                <h1>Categories</h1>
                {
                    Categories.map( category => 
                    <div key={category.id} id={ category.id }>
                        { category.name }
                    </div>)
                }
            </div>
        )
    }
}

