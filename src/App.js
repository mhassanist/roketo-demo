import "regenerator-runtime/runtime"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Big from "big.js"
import Form from "./components/Form"
import SignIn from "./components/SignIn"
import { v4 as uuid } from "uuid"

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed()

const App = ({ contract, contract2, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(contract)
    const {
      fieldset,
      nfttitle,
      nftdescription,
      nftmedialink,
      message,
      donation,
    } = e.target.elements

    fieldset.disabled = true

    console.log("Receiver: ", currentUser.accountId)
    console.log("Receiver: ", nfttitle.value)
    console.log("Receiver: ", nftdescription.value)
    console.log("Receiver: ", nftmedialink.value)
    console.log("Receiver: ", donation.value)

    contract.ft_transfer_call(
      {
        receiver_id: "streaming-r-v2.dcversus.testnet",
        amount: "5000000000000000000000000", // 5 NEAR
        memo: "Roketo transfer",
        msg: JSON.stringify({
          Create: {
            request: {
              owner_id: "mentorperhour.testnet",
              receiver_id: "mhassanist.testnet",
              tokens_per_sec: 1388888888888888888888, // 1 hour for 5 NEAR
            },
          },
        }),
      },
      500000000000,
      1
    )

    // contract
    //   .near_deposit({}, 200000000000000, 1000000000000000000000000)
    //   .catch((e) => {
    //     console.log(e)
    //   })
    //   .then(() => {
    //     alert()

    //   })

    // near call streaming-r-v2.dcversus.testnet get_account_outgoing_streams '{"account_id": "kunaldawar.testnet", "from": 0,"limit": 5}' --accountId kunaldawar.testne

    // contract
    //   .nft_mint(
    //     {
    //       token_id: uuid(),
    //       receiver_id: currentUser.accountId,
    //       token_metadata: {
    //         title: nfttitle.value,
    //         description: nftdescription.value,
    //         media: nftmedialink.value,
    //         copies: 1,
    //       },
    //     },
    //     BOATLOAD_OF_GAS,
    //     Big(donation.value)
    //       .times(10 ** 24)
    //       .toFixed()
    //   )
    //   .catch((e) => {
    //     console.log(e)
    //   })
    //   .then(() => {
    //     alert(
    //       "Thanks for your support!. The NFT is minted and can be found in your wallet's collection tab."
    //     )
    //   })
  }

  const signIn = () => {
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.near_deposit.name],
      }, //contract requesting access
      "UkraineZoo", //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    )
  }

  const signOut = () => {
    wallet.signOut()
    window.location.replace(window.location.origin + window.location.pathname)
  }

  return (
    <main>
      <header>
        {currentUser ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
        <h1 display="block">Hire Mentors to support your live!</h1>
      </header>

      {currentUser ? (
        <Form
          onSubmit={onSubmit}
          currentUser={currentUser}
          contract={contract}
          contract2={contract2}
        />
      ) : (
        <SignIn />
      )}
      {currentUser ? <div></div> : <button onClick={signIn}>Log in</button>}
    </main>
  )
}

App.propTypes = {
  contract: PropTypes.shape({
    near_deposit: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
}

export default App
