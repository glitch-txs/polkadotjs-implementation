import { ApiPromise, WsProvider } from '@polkadot/api'
import React, { useEffect, useState } from 'react'

const Interaction = () => {
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
  
  return (
    <>
      <br />
      Period: {period}
    </>
  )
}

export default Interaction