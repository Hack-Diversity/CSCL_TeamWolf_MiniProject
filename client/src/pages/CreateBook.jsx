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
            available: ''
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

    handleChangeInputPublicationYear = async event => {
        const publication_year = event.target.value
        this.setState({ publication_year })
    }

    handleChangeInputSmallImageURL = async event => {
        const image_url_s = event.target.value
        this.setState({ image_url_s })
    }

    handleChangeInputMediumImageURL = async event => {
        const image_url_m = event.target.value
        this.setState({ image_url_m })
    }

    handleChangeInputLargeImageURL = async event => {
        const image_url_l = event.target.value
        this.setState({ image_url_l })
    }

    handleChangeInputCopies = async event => {
        const copies = event.target.value
        this.setState({ copies })
    }

    handleChangeInputAvailable = async event => {
        const available = event.target.value
        this.setState({ available })
    }

    handleAddBook = async () => {
        const { title, author, isbn, publisher, publication_year, image_url_s, image_url_m, image_url_l, copies, available } = this.state
        const payload = { title, author, isbn, publisher, publication_year, image_url_s, image_url_m, image_url_l, copies, available}

        await api.addBook(payload).then(res => {
            window.alert(`Book created successfully`)
            this.setState({
                title: '',
                author: '',
                isbn: '',
                publisher: '',
                publication_year: '',
                image_url_s: '',
                image_url_m: '',
                image_url_l: '',
                copies: '',
                available: '',
            })
        })
    }

    render() {
        const { title, author, isbn, publisher, publication_year, image_url_s, image_url_m, image_url_l, copies, available } = this.state
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

                <Label>Publisher: </Label>
                <InputText
                    type="text"
                    value={publisher}
                    onChange={this.handleChangeInputPublisher}
                />

                <Label>Publication Year: </Label>
                <InputText
                    type="number"
                    value={publication_year}
                    onChange={this.handleChangeInputPublicationYear}
                />

                <Label>Small Image URL: </Label>
                <InputText
                    type="text"
                    value={image_url_s}
                    onChange={this.handleChangeInputSmallImageURL}
                />

            <Label>Medium Image URL: </Label>
                <InputText
                    type="text"
                    value={image_url_m}
                    onChange={this.handleChangeInputMediumImageURL}
                />

            <Label>Large Image URL: </Label>
                <InputText
                    type="text"
                    value={image_url_l}
                    onChange={this.handleChangeInputLargeImageURL}
                />

            <Label>Copies: </Label>
                <InputText
                    type="text"
                    value={copies}
                    onChange={this.handleChangeInputCopies}
                />

            <Label>Available: </Label>
                <InputText
                    type="text"
                    value={available}
                    onChange={this.handleChangeInputAvailable}
                />

                <Button onClick={this.handleAddBook}>Add Book</Button>
                <CancelButton href={'/catalog/books'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CreateBook