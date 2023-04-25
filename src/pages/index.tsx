import Interaction from '@/components/blockchain/Interaction'
import ConnectWallet from '@/components/wallets/ConnectWallet'

export default function Home() {

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <ConnectWallet/>
      <Interaction/>
    </main>
  )
}
