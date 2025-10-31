
// import { Navbar } from "../components/Navbar";
import About  from "../components/organisms/About";

import Navbar from "../components/molecule/Navbar";
import HeroSection from "../components/organisms/HeroSection";
import Feature from "../components/organisms/Feature";
import CreateToken2022 from "../web3/CreateToken2022";
import Bento from "../components/molecule/Bento";
import Steps from "../components/molecule/Steps";
import Footer from "../components/molecule/Footer";
import Compatible from "../components/molecule/Compatible";
// import SocketTest from "../components/molecule/SocketTest";
const Home = () => {
  return (
    <div className="bg-black text-white relative">
      <Navbar className='mb-12'/>
      <HeroSection />
      <About />

      {/* <Feature/> */}
            <Bento/>
            <Steps/>
            <Compatible/>
            <Footer/>
      {/* <CreateToken2022/> */}
      {/* <SocketTest/> */}
    </div>
  );
};
export default Home;
