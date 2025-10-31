import { FiLink, FiEdit3, FiZap } from "react-icons/fi";

export default function Steps() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          How Sandbox AI<span className="text-blue-500/80"> Agent</span> Works
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          From wallet connection to execution, our AI handles every Web3 action
          seamlessly — all you do is describe what you want.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-[#0b0b0b] border border-[#1f1f1f] rounded-2xl p-8 text-left hover:border-[#2f2f2f] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-600 to-black-500 flex items-center justify-center mb-6">
              <FiLink className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              1. Connect Wallet
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Link your Solana wallet securely in seconds. Our platform uses
              non-custodial authentication for complete control.
            </p>
            <ul className="mt-4 text-xs text-gray-500 list-disc list-inside">
              <li>Phantom / Solflare Support</li>
              <li>Instant Authentication</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0b0b0b] border border-[#1f1f1f] rounded-2xl p-8 text-left hover:border-[#2f2f2f] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-500 to-black-500 flex items-center justify-center mb-6">
              <FiEdit3 className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              2. Just Write What You Want
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Type a simple natural command like “Send 2 SOL to Bob” or “Stake
              10 SOL.” Our AI interprets and builds the exact transaction for you.
            </p>
            <ul className="mt-4 text-xs text-gray-500 list-disc list-inside">
              <li>Natural Language Prompts</li>
              <li>Smart Context Understanding</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0b0b0b] border border-[#1f1f1f] rounded-2xl p-8 text-left hover:border-[#2f2f2f] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-600 to--400 flex items-center justify-center mb-6">
              <FiZap className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              3. Agent Executes
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Our AI agent ask you to signs and executes your request — from
              sending, swapping, to staking — all verified on-chain.
            </p>
            <ul className="mt-4 text-xs text-gray-500 list-disc list-inside">
              <li>On-Chain Verification</li>
              <li>Secure AI Execution</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
