// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Spark features",
//     items: ["Bank Accounts", "Stablecoins", "Tokens", "Coinbase", "SEPA", "IBAN", "RTP", "SWIFT", "Lightning"],
//   },
//   {
//     title: "Selected features",
//     items: ["Bank Accounts", "Stablecoins", "FIAT", "ACH", "Bitcoin"],
//   },
//   {
//     title: "Developer tools",
//     items: ["API Access", "Webhooks", "SDKs", "CLI Tools", "Automation"],
//   },
//   {
//     title: "Security",
//     items: ["2FA", "End-to-End Encryption", "Multi-Sig Wallets", "Cold Storage"],
//   },
//   {
//     title: "Integrations",
//     items: ["Solana", "Ethereum", "Polygon", "Stripe", "PayPal"],
//   },
// ];

// export default function Feature() {
//   return (
//     <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
//       {/* Left Fixed Section */}
//       <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center px-20">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-5xl font-semibold mb-6 leading-tight">
//             Spark is the <span className="text-gray-300">cheat code</span> for payments
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Build the next [Wise, Cash App, your favorite fintech] from anywhere,
//             with less than <span className="text-white">1% of the complexity.</span>
//           </p>
//         </motion.div>
//       </div>

//       {/* Right Scrollable Section */}
//       <div className="w-1/2 h-screen overflow-y-scroll px-16 py-20 space-y-24 scrollbar-hide">
//         {features.map((feature, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: i * 0.1 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-br from-[#121212] to-[#0c0c0c] rounded-3xl p-8 shadow-xl border border-[#1a1a1a] relative"
//           >
//             <h2 className="text-xl text-gray-300 mb-6">{feature.title}</h2>
//             <div className="flex flex-wrap gap-3">
//               {feature.items.map((item, j) => (
//                 <motion.div
//                   key={j}
//                   whileHover={{ scale: 1.05 }}
//                   className="bg-[#1a1a1a] text-gray-200 px-4 py-2 rounded-xl text-sm border border-[#2a2a2a] hover:border-[#3a3a3a] transition"
//                 >
//                   {item}
//                 </motion.div>
//               ))}
//             </div>

//             {/* Subtle glow */}
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#ffffff05] to-transparent pointer-events-none" />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { motion } from "framer-motion";

const features = [
  {
    title: "Global Payments Infrastructure",
    items: ["Bank Accounts", "Stablecoins", "Tokens", "Coinbase", "SEPA", "IBAN", "RTP", "SWIFT"],
    image: "https://images.prismic.io/spark-info-web/aGx8SkMqNJQqHqCP_build_payments-1.png?auto=format,compress",
  },
  {
    title: "Selected Features Overview",
    items: ["Bank Accounts", "Stablecoins", "FIAT", "ACH", "Bitcoin"],
    image: "https://images.prismic.io/spark-info-web/aGx8S0MqNJQqHqCQ_build_payments-2.png?auto=format,compress",
  },
  {
    title: "Developer Tools",
    items: ["API Access", "Webhooks", "SDKs", "CLI Tools", "Automation"],
    image: "https://images.prismic.io/spark-info-web/aGx8S0MqNJQqHqCR_build_payments-3.png?auto=format,compress",
  },
  {
    title: "Security Stack",
    items: ["2FA", "Encryption", "Multi-Sig", "Cold Storage", "Session Tokens"],
    image: "https://images.prismic.io/spark-info-web/aGx9V0MqNJQqHqCY_build_payments-4.png?auto=format,compress",
  },
  {
    title: "Integrations",
    items: ["Solana", "Ethereum", "Polygon", "Stripe", "PayPal", "Apple Pay"],
    image: "https://images.prismic.io/spark-info-web/aGx8S0MqNJQqHqCQ_build_payments-2.png?auto=format,compress",
  },
];

export default function Feature() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Left Fixed Section */}
      <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center px-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-semibold mb-6 leading-tight">
            Sandbox is the <span className="text-gray-300">cheat code</span> for payments
          </h1>
          <p className="text-gray-400 text-lg">
            Build the next [Wise, Cash App, your favorite fintech] from anywhere,
            with less than <span className="text-white">1% of the complexity.</span>
          </p>
        </motion.div>
      </div>

      {/* Right Scrollable Section */}
      <div
        className="w-1/2 h-screen overflow-y-scroll px-16 py-20 space-y-24"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <style>{`
          /* Hide scrollbar for Chrome, Safari, Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#121212] to-[#0c0c0c] rounded-3xl p-8 shadow-xl border border-[#1a1a1a] relative overflow-hidden"
          >
            {/* Image Section */}
            <motion.img
              src={feature.image}
              alt={feature.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 opacity-90 hover:opacity-100 transition duration-300"
              whileHover={{ scale: 1.03 }}
            />

            {/* Text Content */}
            <h2 className="text-xl text-gray-300 mb-6">{feature.title}</h2>
            <div className="flex flex-wrap gap-3">
              {feature.items.map((item, j) => (
                <motion.div
                  key={j}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#1a1a1a] text-gray-200 px-4 py-2 rounded-xl text-sm border border-[#2a2a2a] hover:border-[#3a3a3a] transition"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Glow Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#ffffff05] to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
