import React, { Component } from 'react'
import api from '../api'
import '../styles/bookInfo.css'


import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

class BorrowBook extends Component {
    updateBook = event => {
        if (
            window.confirm(
                `Do you want to borrow ${this.props.title}?`,
            )
        ) {
            api.borrowBook(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <BorrowBook onClick={this.updateBook}>Borrow</BorrowBook>
    }
}

class ReturnBook extends Component {
    updateBook = event => {
        if (
            window.confirm(
                `Do you want to return ${this.props.title}?`,
            )
        ) {
            api.returnBook(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <ReturnBook onClick={this.updateBook}>Return</ReturnBook>
    }
}

class BookInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isbn: '',
            author: '',
            publication_year: '',
            publisher: '',
            image_url_l: '',
            copies: '',
            available: '',
        }
    }

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        await api.getBook(id).then(book => {
            this.setState({
                title: book.data.title,
                isbn: book.data.isbn,
                author: book.data.author,
                publication_year: book.data.publication_year,
                publisher: book.data.publisher,
                image_url_l: book.data.image_url_l,
                copies: book.data.copies,
                available: book.data.available,
                
            })
        })
    }

    handleBorrowBook = async () => {
        const id = this.props.match.params.id;

        await api.borrowBook(id).then(res => {
            window.alert(`Book borrowed successfully`)
        })
        .catch(err => window.alert(`Sorry, no available copies`))
    }

    handleReturnBook = async () => {
        const id = this.props.match.params.id;

        await api.returnBook(id).then(res => {
            window.alert(`Book returned successfully`)
        })
    }
    
    render() {
        const book = this.state
        console.log(book)
        
        return (
            <main className="flex-container">
                <div id="book-image-section">
                    <img src={book.image_url_l}/>
                </div>
                <div id="book-content-section">
                    <h1 className="book-title"><span>{book.title}</span></h1>
                    <h2 className="book-details">By: {book.author}</h2>
                    <h3 className="book-details">Publisher: {book.publisher}</h3>
                    <h3 className="book-details">Year of Publication: {book.publication_year}</h3>
                    <h3 className="book-details">Number of copies: {book.copies}</h3>
                    <h3 className="book-details">Copies available: {book.available}</h3>

                    <Wrapper className="buttons-container" style={{padding: "0em"}}>
                        <Button className="button" onClick={this.handleReturnBook}>Return Book</Button>
                        <Button className="button" onClick={this.handleBorrowBook}>Borrow Book</Button>
                    </Wrapper>
                </div>

                
            </main>




        );
    }
}

export default BookInfo