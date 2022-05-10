import React from "react"

export default function SignIn() {
  return (
    <>
      <div id="entry">
        <img id="logo" src={require("../assets/logo.png")}></img>
        <p>
          When you login, you will see a list of experts willing to help you.
          Start by hiring them. each second you spend.
        </p>
        <p>
          If you are not happy with the mentor, you can refund any time during
          the first 10 minutes
        </p>
      </div>
    </>
  )
}
