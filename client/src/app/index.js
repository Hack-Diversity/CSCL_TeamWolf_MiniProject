import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { AdminDashboard, CreateBook, UpdateBookStock, UpdateBookAvailable, BookInfo, UserBooksList, HomePage} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/index.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/catalog/books" exact component={UserBooksList} />
                <Route path="/catalog/book/:id" exact component={BookInfo} />
                <Route path="/admin/dashboard" exact component={AdminDashboard} />
                <Route path="/admin/book/create" exact component={CreateBook} />
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/admin/book/:id/updateStock"
                    exact
                    component={UpdateBookStock}
                />
                <Route
                    path="/admin/book/:id/updateAvailable"
                    exact
                    component={UpdateBookAvailable}
                />
            </Switch>
        </Router>
    )
}

export default App