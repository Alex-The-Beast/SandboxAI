// import { motion } from "framer-motion";

// const integrations = [
//   {
//     name: "Phantom",
//     logo: "/phantom.svg",
//   },
//   {
//     name: "Backpack",
//     logo: "/backpack.jpeg",
//   },
//   {
//     name: "Trust Wallet",
//     logo: "turst.png",
//   },
//     {
//     name: "MetaMask",
//     logo: "meta.png",
//   },
//   {
//     name: "Solflare",
//     logo: "solflate.png",
//   },
//   {
//     name: "Jupiter",
//     logo: "jup.png",
//   },
//   {
//     name: "Helius",
//     logo: "helius.png",
//   },
//   {
//     name: "Alchemy",
//     logo: "alchemy.jpg",
//   },
//   {
//     name: "Sanctum",
//     logo: "sanctum.jpg",
//   },
//   {
//     name:'Raydium',
//     logo:"radium.png"
//   }
// ];

// const Compatible = () => {
//   return (
//     <section className="bg-black py-20 ">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         {/* Section Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-semibold mb-10 text-gray-400"
//         >
//           Compatible With Leading Wallets & APIs
//         </motion.h2>

//         {/* Logos Grid */}
//     <div className="max-w-4xl mx-auto opacity-30">
//             <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mx-w-4xl mx-auto gap-10 items-center justify-center"
//         >
//           {integrations.map((item, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ scale: 1.1 }}
//               className="flex flex-col items-center justify-center p-4 rounded-2xl hover:from-[#0b0b0b] transition-all duration-300 shadow-lg shadow-black/40"
//             >
//               <img
//                 src={item.logo}
//                 alt={item.name}
//                 className="h-10 sm:h-12 md:h-14 w-auto object-contain mb-2"
//               />
//               <p className="text-sm text-gray-400">{item.name}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//     </div>

//       </div>
//     </section>
//   );
// };

// export default Compatible;


import { motion } from "framer-motion";

const integrations = [
  { name: "Phantom", logo: "/phantom.svg" },
  { name: "Backpack", logo: "/backpack.jpeg" },
  { name: "Trust Wallet", logo: "/turst.png" },
  { name: "MetaMask", logo: "/meta.png" },
  { name: "Solflare", logo: "/solflate.png" },
  { name: "Jupiter", logo: "/jup.png" },
  { name: "Helius", logo: "/helius.png" },
  { name: "Alchemy", logo: "/alchemy.jpg" },
  { name: "Sanctum", logo: "/sanctum.jpg" },
  { name: "Raydium", logo: "/radium.png" },
];

const Compatible = () => {
  return (
    <section className="bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 border-t border-l border-r border-gray-800 rounded-t-3xl pt-12 pb-8">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold mb-16 text-gray-300 tracking-tight "
        >
          Compatible With Leading Wallets & APIs
        </motion.h2>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 items-center justify-center max-w-2xl mx-auto "
        >
          {integrations.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center justify-start p-5 rounded-2xl  transition-all duration-300 opacity-50 hover:opacity-80"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-16 w-16 object-cover rounded-full mb-4 border border-gray-800 shadow-md shadow-black/40"
              />
              <p className="text-sm text-gray-400 font-medium">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Compatible;
