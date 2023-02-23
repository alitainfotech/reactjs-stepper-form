import "./App.css";
import MultiStepForm from "./component/MultiStepForm/MultiStepForm";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="App">
      <motion.div
        className="fromBox"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", bounce: 0.25, duration: 3 }}
      >
        <MultiStepForm />
      </motion.div>
    </div>
  );
}

export default App;
