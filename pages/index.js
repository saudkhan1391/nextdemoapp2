import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import firebase from '../components/utils/firebase';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = () => {
    console.log("email", email)
    console.log("password", password)
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      alert("Registered");
      const { pathname } = Router
      // if (pathname == '/') {
        Router.push('/login')
      // }
    }).catch((e) => { alert(e.message) })
  }
  return (
    <div className="main">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero">
        <div className="loginContainer">
          <h1 className="registerText">Register</h1>
          <h2>Email</h2>
          <input onChange={(text) => { setEmail(text.target.value) }} placeholder="youremail@gmail.com" className="emailinput" />
          <h2>Password</h2>
          <input onChange={(text) => { setPassword(text.target.value) }} placeholder="******" className="emailinput" />
          <div style={{ marginTop: 40 }}>
            <Button variant="contained" color="primary" onClick={() => { register() }}  >
              Register
            </Button>
          </div>
        </div>

      </div>

      <style jsx>{`
      .registerText{
        color: grey;
        text-align: center;
      }
      :global(body) {
        background-color: black;
        padding:0;
        margin: 0px;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
       body{
        background-color: black;
        margin: 0px;
      }
      .main{
        background-color:black;
        height:750px;
      }
      .loginContainer{
        border:solid 1px;
        background-color: #efefef;
        padding : 20px;
        width:300px;
        margin-left:200px;
        padding-bottom:60px;
      }
      .emailinput{
        border-radius:20px;
        padding: 10px
      }
      .hero {
        width: 100%;
        color: #333;
      }
    `}</style>
    </div>
  )
}

export default Home
