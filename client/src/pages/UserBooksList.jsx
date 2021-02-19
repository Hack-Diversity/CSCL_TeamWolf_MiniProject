import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'
import 'react-table/react-table.css'

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
                Header: 'Thumbnail',
                accesor: 'image_url_m',
                Cell: props => {
                    return ( 
                        <div style={{ textAlign: "center" }}>
                        <a value={props.original._id} onClick={() => this.routeChange(props.original._id)} >
                        <span data-item-id={props.original.image_url_m}>
                            <img src={props.original.image_url_m} alt="Book Cover"/>
                        </span>
                        </a>
                        </div>
                    )
                  },
                  
                
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
                Cell: props => {
                    return ( 
                        <div style={{ textAlign: "center" }}>
                            {props.original.title}
                        </div>
                    )
                  },
            },
            {
                Header: 'Author',
                accessor: 'author',
                filterable: true,
                Cell: props => {
                    return ( 
                        <div style={{ textAlign: "center" }}>
                            {props.original.author}
                        </div>
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

export default UserBooksList