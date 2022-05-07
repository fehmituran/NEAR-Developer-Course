import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row } from "react-bootstrap";
import { Rules } from './rules';
import './style.css';
import { Game } from './game';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

let resultMaster = ""



export default function App() {
  
  
  const [mindmaster, setMastermind] = React.useState()

  const [showNotification, setShowNotification] = React.useState(false)
 
  React.useEffect(
    () => {
      if (window.walletConnection.isSignedIn()) {
        window.contract.getMastermind({ accountId: window.accountId })
          .then(masterFromContract => {
            setMastermind(masterFromContract)
          })
      }
    },

    []
  )



  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MasterMind</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>

              <Nav.Link onClick={(window.accountId === '') ? login : logout} eventKey={2} >
                {(window.accountId === '') ? 'Login' : window.accountId}
              </Nav.Link>

              <button className="link" style={{ float: 'right' }} onClick={logout}>
                Sign out
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <main style={{ float: 'right' }}>

        <form onSubmit={async event => {
          event.preventDefault()


          const durum = JSON.parse(localStorage.getItem("durum"));

          let result = ""

          if (JSON.parse(localStorage.getItem("durum"))) {
            result = 'Win.. Colors: '
            resultMaster = " Congratulations, Mastermind Sent You 1 Near "
          } else {
            result = 'Lost.. Colors: '
            resultMaster = "Unfortunateley, You Lost"
          }

          const newResult = result + window.localStorage.getItem("color")


          try {
            // make an update call to the smart contract
            await window.contract.setMastermind({
              message: newResult
            })
          } catch (e) {
            alert(
              'Something went wrong! ' +
              'Maybe you need to sign out and back in? ' +
              'Check your browser console for more info.'
            )
            throw e
          } finally {
           
          }

          setMastermind(newResult)

          setShowNotification(true)


          setTimeout(() => {
            setShowNotification(false)
          }, 11000)
        }}>
          <fieldset id="fieldset">
            <div style={{ display: 'flex' }}>
              <button
                style={{ borderRadius: '0 5px 5px 0' }}
              >
                Calim Your Award
              </button>
            </div>
          </fieldset>
        </form>
      </main>
      {showNotification && <Notification />}
     
      <Container>
        <Rules />
        <Game />
      </Container>
    </>
  )
}


function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  const result = JSON.parse(localStorage.getItem("durum"))
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {', '}
      {resultMaster}
      {', '}
        
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}

