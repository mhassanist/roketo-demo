import React from "react"
import PropTypes from "prop-types"

async function fttrans(contract, currentUser, rcv) {
  return contract.ft_transfer_call(
    {
      receiver_id: "streaming-r-v2.dcversus.testnet",
      amount: "5000000000000000000000000", // 5 NEAR
      memo: "Roketo transfer",
      msg: JSON.stringify({
        Create: {
          request: {
            owner_id: currentUser.accountId,
            receiver_id: rcv,
            tokens_per_sec: parseInt("385802469135802500"), // 1 hour for 5 NEAR
          },
        },
      }),
    },
    200000000000000,
    1
  )
}

async function getstreams(contract2, currentUser) {
  return contract2.get_account_outgoing_streams({
    account_id: "mentorperhour.testnet",
    from: 0,
    limit: 15,
  })
}

async function withdraw(contract2) {
  return contract2.withdraw(
    {
      stream_ids: ["Bn3LtGR3MibF91fMKfvQK1sdpjBmALsSjYkDC3JNPuJM"],
    },
    200000000000000,
    1
  )
}

export default function Form({ onSubmit, currentUser, contract, contract2 }) {
  async function start(rcv) {
    console.log(await fttrans(contract, currentUser, rcv))
  }
  async function show() {
    console.log(await getstreams(contract2, currentUser))
  }
  async function withdrawA() {
    console.log(await withdraw(contract2))
  }

  return (
    <div id="img-wrapper">
      <form>
        <fieldset id="fieldset">
          <h2>I can help with Java and C#</h2>
          <input type="hidden" id="nfttitle" value="Kutei 8" />
          <input type="hidden" id="nftdescription" value="Kutei 8" />
          <input
            type="hidden"
            id="nftmedialink"
            value="https://bafybeigs56tgxrh3dahtyjs7znpeh3apsxa3ruojdn7o6mjrvdd234bi6m.ipfs.nftstorage.link/"
          />
          <input type="hidden" id="donation" value="4" />
          <p>
            <label htmlFor="donation">
              {
                "12 Yrs of experience in Java and C#, with a strong background in Blockchain and Smart Contracts"
              }
            </label>
          </p>
          <button type="button" onClick={() => start("mhassanist9.testnet")}>
            Hire
          </button>
          <button type="button" onClick={show}>
            Show Stream
          </button>
          <button type="button" onClick={withdrawA}>
            Withdraw
          </button>
        </fieldset>
      </form>

      <form>
        <fieldset id="fieldset">
          <h2>I'm a proficient in C/C++</h2>
          <input type="hidden" id="nfttitle" value="Kutei 8" />
          <input type="hidden" id="nftdescription" value="Kutei 8" />
          <input
            type="hidden"
            id="nftmedialink"
            value="https://bafybeigs56tgxrh3dahtyjs7znpeh3apsxa3ruojdn7o6mjrvdd234bi6m.ipfs.nftstorage.link/"
          />
          <input type="hidden" id="donation" value="4" />
          <p>
            <label htmlFor="donation">
              {
                "6 years of experience in C/C++, with a strong background in Blockchain and Smart Contracts"
              }
            </label>
          </p>
          <button type="button" onClick={() => start("msaudi.testnet")}>
            Hire
          </button>
          <button type="button" onClick={show}>
            Show Stream
          </button>
          <button type="button" onClick={withdrawA}>
            Withdraw
          </button>
        </fieldset>
      </form>

      <form>
        <fieldset id="fieldset">
          <h2>I'm an expert in Flutter</h2>
          <input type="hidden" id="nfttitle" value="Kutei 8" />
          <input type="hidden" id="nftdescription" value="Kutei 8" />
          <input
            type="hidden"
            id="nftmedialink"
            value="https://bafybeigs56tgxrh3dahtyjs7znpeh3apsxa3ruojdn7o6mjrvdd234bi6m.ipfs.nftstorage.link/"
          />
          <input type="hidden" id="donation" value="4" />
          <p>
            <label htmlFor="donation">
              {
                "10 years of experience in Flutter, with a strong background in Dart and Web"
              }
            </label>
          </p>
          <button type="button" onClick={() => start("mhassanist9.testnet")}>
            Hire
          </button>
          <button type="button" onClick={show}>
            Show Stream
          </button>
          <button type="button" onClick={withdrawA}>
            Withdraw
          </button>
        </fieldset>
      </form>
    </div>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
}
