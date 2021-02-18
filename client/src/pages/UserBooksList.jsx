import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'
import BookInfo from './BookInfo'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class UserBooksList extends Component {
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

    routeChange=(id)=> {
        let path = `/catalog/book/${id}`;
        this.props.history.push(path);
      }


    render() {
        const { books, isLoading } = this.state
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
                Cell: ({ original }) => (
                    <a value={original._id} onClick={() => this.routeChange(original._id)} > 
                        {original._id} 
                    </a>)
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
                Header: 'Thumbnail',
                accessor: 'image_url_s',
                filterable: true,
                
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

export default UserBooksList