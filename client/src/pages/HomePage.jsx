import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import api from '../api'

import styled from 'styled-components'
import pic from './back.jpg'
import App from '../app'


const Title = styled.h1.attrs({
    className: 'h1',
})``


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`


const  customStyle = {
    color: "gary",
    width: "800px",
    textAlign: "auto",
    float: "right",
    paddingRight:"110px",
    margin:"auto",
   
}
const bgd = {
    width : "600px",
    height :"400px",
    paddingLeft:"160px"
}

const dv ={
    width: "100%",
    margin:"auto",
    
}

  

class CreateBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isbn: '',
            title: '',
            author: '',
            publication_year: '',
            publisher: '',
            image_url_s: '',
            image_url_m: '',
            image_url_l: '',
            copies: '',
            available: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputAuthor = async event => {
        const author = event.target.value
        this.setState({ author})
    }

    handleChangeInputISBN = async event => {
        const isbn = event.target.value
        this.setState({ isbn })
    }

    handleChangeInputPublisher = async event => {
        const publisher = event.target.value
        this.setState({ publisher })
    }

    handleAddBook = async () => {
        const { title, author, isbn } = this.state
        const payload = { title, author, isbn}

        await api.addBook(payload).then(res => {
            window.alert(`Book created successfully`)
            this.setState({
                title: '',
                author: '',
                isbn: '',
            })
        })
    }

    render() {
        const { title, author, isbn, publisher } = this.state
        return (
            <div style = {dv}>
            <p style = {customStyle}>
    <Title>The CSCL coffee shop</Title>
        The CSCL coffeshop is created by team Wold (Hack.Diversity). 
        Our main product of the store will be coffee and books. We have thousands of books to pick from
        so come to our local coffeshop and enjoy reading your favorite books. 

        </p>
        { 
        <img style = {bgd} src = {pic}/>
     }
        </div>
        )
    }
}



export default CreateBook;