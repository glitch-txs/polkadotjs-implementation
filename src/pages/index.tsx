import { WsProvider, ApiPromise } from '@polkadot/api'
import { useEffect, useState } from 'react'
import ConnectWallet from '@/components/wallets/ConnectWallet'

const NAME = 'MyDappName'

export default function Home() {
  const [api, setApi] = useState<ApiPromise>()

  const setup = async()=>{
    const provider = new WsProvider("wss://ws.gm.bldnodes.org/")
    const api = await ApiPromise.create({provider})
    setApi(api)
  }

  useEffect(()=>{setup()},[])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <ConnectWallet/>
    </main>
  )
}
