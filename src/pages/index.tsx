import { WsProvider, ApiPromise } from '@polkadot/api'
import { ChangeEvent, useEffect, useState } from 'react'
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"

const NAME = 'MyDappName'

export default function Home() {
  const [api, setApi] = useState<ApiPromise>()
  const [accounts, setAccount] = useState<InjectedAccountWithMeta[]>([])
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>()


  const setup = async()=>{
    const provider = new WsProvider("wss://ws.gm.bldnodes.org/")
    const api = await ApiPromise.create({provider})
    setApi(api)
  }

  useEffect(()=>{setup()},[])
  
  useEffect(()=>{
    if(!api) return

  (async()=>{
    const time = await api.query.timestamp.now()
    console.log(time.toPrimitive())
  })()
  },[])

  const handleConnection = async()=>{
    const { web3Enable,web3Accounts } = await import("@polkadot/extension-dapp");
    await web3Enable(NAME)

    const allAccounts = await web3Accounts()
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <button
      disabled={accounts.length != 0}
      onClick={handleConnection}
      className='py-0.5 px-2 rounded-md hover:bg-gray-800 transition duration-75 border-2' >
        Connect
      </button>
      {accounts.length > 0 && 
        <select onChange={handleSelect} >
          {accounts.map((ac)=>(
            <option key={ac.address} value={ac.address} >{ac.address}</option>
          ))}
        </select>
      }
      <span>Selected Account: {selectedAccount?.address}</span>
    </main>
  )
}
