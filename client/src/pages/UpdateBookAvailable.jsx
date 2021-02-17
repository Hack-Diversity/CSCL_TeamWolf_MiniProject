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

class UpdateBookAvailable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            available: '',
        }
    }

    handleChangeInputAvailable = async event => {
        const available = event.target.value
        this.setState({ available })
    }

    handleUpdateBook = async () => {
        const { id, available } = this.state
        const payload = { available }

        await api.updateBookAvailable(id, payload).then(res => {
            window.alert(`Book available updated successfully`)
            this.setState({
                available: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const book = await api.getBook(id)

        this.setState({
            available: book.data.available,
        })
    }

    render() {
        const { available } = this.state
        return (
            <Wrapper>
                <Title>Update Book Available</Title>

                <Label>Available:</Label>
                <InputText
                    type="number"
                    value={available}
                    onChange={this.handleChangeInputAvailable}
                />                

                <Button onClick={this.handleUpdateBook}>Update Book Available</Button>
                <CancelButton href={'/catalog/books'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UpdateBookAvailable