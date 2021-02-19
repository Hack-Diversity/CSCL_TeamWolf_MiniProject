import React, { Component } from 'react'
import pic from '../homepage.jpg'

const bgd = {
    width : "600px",
    height :"400px",
    
}

class HomePage extends Component {
render() {
    return (
        <div style = {{ textAlign: "center" }}>
        <h1>The CSCL coffee shop</h1>
        <br></br>
        <img style = {bgd} src={pic} alt="coffee"></img>
        <br></br>
        <br></br>
        <h3>
        The CSCL coffeshop is created by Team Wolf (Hack.Diversity). 
        Our main product of the store will be coffee and books. We have thousands of books to pick from
        so come to our local coffeshop and enjoy reading your favorite books. Check out the List Books link above!
        </h3>
        </div>
    )
}
}

export default HomePage