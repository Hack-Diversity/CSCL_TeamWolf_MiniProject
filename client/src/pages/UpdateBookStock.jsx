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

class UpdateBookStock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            copies: '',
        }
    }

    handleChangeInputCopies = async event => {
        const copies = event.target.value
        this.setState({ copies })
    }

    handleUpdateBook = async () => {
        const { id, copies } = this.state
        const payload = { copies }

        await api.updateBookStock(id, payload).then(res => {
            window.alert(`Book stock updated successfully`)
            this.setState({
                copies: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const book = await api.getBook(id)

        this.setState({
            copies: book.data.copies,
        })
    }

    render() {
        const { copies } = this.state
        return (
            <Wrapper>
                <Title>Update Book Stock</Title>

                <Label>Copies:</Label>
                <InputText
                    type="number"
                    value={copies}
                    onChange={this.handleChangeInputCopies}
                />                

                <Button onClick={this.handleUpdateBook}>Update Book Stock</Button>
                <CancelButton href={'/catalog/books'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UpdateBookStock