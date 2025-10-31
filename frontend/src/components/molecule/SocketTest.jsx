import { useSocketHook } from "../../hooks/contextHooks/useSocketHook.js"
import { io } from "socket.io-client";

const SocketTest = () => {
 const socket=io("http://localhost:3000");
  return (
    <div>
      <button onClick={() => socket.emit("test", "test")}>test</button>
      
    </div>
  )
}

export default SocketTest
