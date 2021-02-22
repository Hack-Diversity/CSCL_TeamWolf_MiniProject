import React, { Component } from 'react'
import pic from '../homepage.jpg'

const bgd = {
    width : "600px",
    height :"400px",
    
}

const homePageStyle = {
    fontSize: "20px",
    padding: "20px",
    fontFamily: "Arial",
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
        <h3 style={homePageStyle}>
        The CSCL coffeeshop is created by Team Wolf (Hack.Diversity). 
        Our main product is coffee and books. We have hundreds of books to pick from
        so come to your local coffeeshop and enjoy reading your favorite books. 
        Check out the List Books link above to borrow/return books!
        </h3>
        </div>
    )
}
}

export default HomePage
