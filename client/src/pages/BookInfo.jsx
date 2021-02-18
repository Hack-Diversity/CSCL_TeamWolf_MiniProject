import React, { Component } from 'react'
import api from '../api'


import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
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

            title:'',
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
        const id = this.props.match.params._id; //Undefined
        await api.getBook(id).then(book => {
            this.setState({
                title: this.book.data.title,
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
    
    render() {
        const book = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Author',
                accessor: 'author',
                filterable: true,
            },
            {
                Header: 'ISBN',
                accessor: 'isbn',
                filterable: true,
                
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <BorrowBook id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <ReturnBook id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        console.log(book)

        return (
            <>
                <p>Work to be done</p>
            </>
        );
        
    }
}

export default BookInfo