import { useState } from "react";
import { Provider } from "./MultiStepFormContext";
import { Steps } from "antd";
import Personal from "./Personal";
import Contact from "./Contact";
import Payment from "./Payment";
import { motion } from "framer-motion";

const { Step } = Steps;

const personalInformation = {
  name: "",
  lastName: "",
  age: "",
};

const contactInformation = {
  email: "",
  phone: "",
  address: "",
};

const paymentInformation = {
  cardName: "",
  cardNumber: "",
  cvv: "",
};

const renderStep = (step: any) => {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Contact />;
    case 2:
      return <Payment />;
    default:
      return null;
  }
};

const MultiStepForm = () => {
  const [personal, setPersonal] = useState(personalInformation);
  const [contact, setContact] = useState(contactInformation);
  const [payment, setPayment] = useState(paymentInformation);
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);

  const next = () => {
    if (currentStep === 2) {
      setCurrentStep(0);
      setPersonal(personalInformation);
      setContact(contactInformation);
      setPayment(paymentInformation);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <>
      <Provider
        value={{
          personal,
          setPersonal,
          next,
          prev,
          contact,
          setContact,
          payment,
          setPayment,
          show,
          setShow,
        }}
      >
        <Steps current={currentStep}>
          <Step title={" Personal details"} />
          <Step title={"Contact details"} />
          <Step title={"Payment details"} />
        </Steps>
        <main className="mainForm">{renderStep(currentStep)}</main>
      </Provider>
      <div className="router">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "Hide Data" : "Show Data"}
        </motion.button>
        {show && (
          <motion.div
            className="table-data"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
            }}
          >
            <table>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Age</th>
              </tr>
              <tr>
                <td>{personal.name}</td>
                <td>{personal.lastName}</td>
                <td>{personal.age}</td>
              </tr>
              <tr>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
              <tr>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
              </tr>
              <tr>
                <th>Card Name</th>
                <th>Card Number</th>
                <th>Cvv</th>
              </tr>
              <tr>
                <td>{payment.cardName}</td>
                <td>{payment.cardNumber}</td>
                <td>{payment.cvv}</td>
              </tr>
            </table>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default MultiStepForm;
