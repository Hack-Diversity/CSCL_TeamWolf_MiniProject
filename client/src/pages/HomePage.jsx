import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
import pic from './back.jpg';
const Title = styled.h1.attrs({
    className: 'h1',
})``
const Img = styled.div.attrs({
    className: 'img',
})`
    margin: 0 30px;
`

const Content = styled.div`
    
    background-image: url(${pic});
    width: 100%;
    height: 785px;
`
const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

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
            <Content></Content>
        )
    }
}

export default CreateBook