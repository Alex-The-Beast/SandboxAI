// const About=()=>{
//     return (
//         <div className="bg-black ">
//        <div className="max-w-7xl mx-auto">  <img src="/sarah.jpg" alt="" /> </div>
//         </div>
//     )
// }
// export default About

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-black  opacity-80 w-full flex justify-center items-center py-8 sm:py-16">
      <div className="max-w-7xl w-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="overflow-hidden rounded-t-3xl shadow-2xl"
        >
          <motion.img
            src="/sarah1.jpg"
            alt="About"
            className="w-full h-auto rounded-3xl object-cover cursor-pointer transition-transform duration-700 ease-in-out hover:scale-102 hover:brightness-110"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
