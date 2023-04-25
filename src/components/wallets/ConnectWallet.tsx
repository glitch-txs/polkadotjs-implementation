import React, { ChangeEvent, useEffect, useState } from 'react'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

type Props = {}

const ConnectWallet = (props: Props) => {
    const [accounts, setAccount] = useState<InjectedAccountWithMeta[]>([])
    const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>()
  
    const handleConnection = async()=>{
      const { web3Enable,web3Accounts } = await import("@polkadot/extension-dapp");
      const extentions = await web3Enable('My Dapp Name')
      console.log(extentions)
  
      const allAccounts = await web3Accounts({extensions:['talisman']})
      setAccount(allAccounts)
  
      if(allAccounts.length === 1){
        setSelectedAccount(allAccounts[0])
      }
    }
  
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>)=>{
      const selectedA = accounts.find(a => a.address === e.target.value)
      setSelectedAccount(selectedA)
    }
    
  return (
    <div>
      <button
      disabled={accounts.length != 0}
      onClick={handleConnection}
      className='py-0.5 px-2 rounded-md hover:bg-gray-800 transition duration-75 border-2 flex flex-col' >
        Connect
      </button>
      {accounts?.length > 0 && 
        <select onChange={handleSelect} >
          {accounts.map((ac)=>(
            <option key={ac.address} value={ac.address} >{ac.address}</option>
          ))}
        </select>
      }
      <span>Selected Account: {selectedAccount?.address}</span>
    </div>
  )
}

export default ConnectWallet