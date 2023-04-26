import { ApiPromise, WsProvider } from '@polkadot/api'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useEffect, useState } from 'react'
const BN = require('bn.js');

type Props = {
  selectedAccount: InjectedAccountWithMeta | undefined
}

const AMOUNT = new BN(10).mul(new BN(10).pow(new BN(12)))

const Interaction = ({selectedAccount}: Props) => {
  const [api, setApi] = useState<ApiPromise>()
  const [period, setPeriod] = useState<string>('')

  const setup = async()=>{
    const provider = new WsProvider("wss://ws.gm.bldnodes.org/")
    const api = await ApiPromise.create({provider})
    setApi(api)
  }
  
  useEffect(()=>{setup()},[])
  useEffect(()=>{
    if(!api) return
    
    (async()=>{
      const period = (await api.query.currencies.currentTimePeriod()).toPrimitive()
      setPeriod(period as string)
    })()
    
  },[api])
  
  const handleBurn = async()=>{
    if(!api || !selectedAccount) return
    const { web3FromAddress } = await import('@polkadot/extension-dapp');
    const injected = await web3FromAddress(selectedAccount.address)
    api.tx.currencies.burnFren(AMOUNT).signAndSend(selectedAccount.address, {
      signer: injected.signer
    }).catch(console.log)
  }

  return (
    <>
      <br />
      Period: {period}

      {selectedAccount?.address && 
      <button className='py-0.5 px-2 rounded-md hover:bg-gray-800 transition duration-75 border-2' onClick={handleBurn}>Burn 10 Fren</button>}
    </>
  )
}

export default Interaction