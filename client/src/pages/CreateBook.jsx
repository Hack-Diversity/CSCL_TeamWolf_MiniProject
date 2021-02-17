import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
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
        const { title, author, isbn } = this.state
        return (
            <Wrapper>
                <Title>Create Book</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>Author: </Label>
                <InputText
                    type="text"
                    value={author}
                    onChange={this.handleChangeInputAuthor}
                />

                <Label>ISBN: </Label>
                <InputText
                    type="text"
                    value={isbn}
                    onChange={this.handleChangeInputISBN}
                />

                <Button onClick={this.handleAddBook}>Add Book</Button>
                <CancelButton href={'/catalog/books'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CreateBook