import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const UpdateAvailable = styled.div`
    color: #0F57EF;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateBookStock extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/admin/book/${this.props.id}/updateStock`
    }

    render() {
        return <Update onClick={this.updateUser}>Update Stock</Update>
    }
}

class UpdateBookAvailable extends Component {
    updateAvailable = event => {
        event.preventDefault()

        window.location.href = `/admin/book/${this.props.id}/updateAvailable`
    }

    render() {
        return <UpdateAvailable onClick={this.updateAvailable}>Update Available</UpdateAvailable>
    }
}

class DeleteBook extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the book ${this.props.title} permanently?`,
            )
        ) {
            api.deleteBook(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllBooks().then(books => {
            this.setState({
                books: books.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { books, isLoading } = this.state

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
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteBook id={props.original._id} />
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
                            <UpdateBookStock id={props.original._id} />
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
                            <UpdateBookAvailable id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!books.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={books}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default AdminDashboard