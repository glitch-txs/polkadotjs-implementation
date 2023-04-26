import Interaction from '@/components/blockchain/Interaction'
import ConnectWallet from '@/components/wallets/ConnectWallet'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { useState } from 'react'

export default function Home() {

  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <ConnectWallet selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      <Interaction selectedAccount={selectedAccount} />
    </main>
  )
}
