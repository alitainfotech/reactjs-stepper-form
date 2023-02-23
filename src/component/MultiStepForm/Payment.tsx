import { useContext, useState } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const phoneRegExp = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;

const AddSchema = Yup.object().shape({
  cardName: Yup.string().trim().required("Card name is a required field"),
  cardNumber: Yup.string()
    .trim()
    .matches(phoneRegExp, "Card number is not valid")
    .required("Card number is a required field"),
  cvv: Yup.string().trim().required("Cvv number is a required field"),
});

const Payment = () => {
  const [hide, setHide] = useState(false);
  const { payment, setPayment, next, prev, setShow }: any =
    useContext(MultiStepFormContext);

  const handlerHide = () => {
    next();
    setShow(false);
  };

  return (
    <>
      <Formik
        initialValues={payment}
        validationSchema={AddSchema}
        onSubmit={(values) => {
          setPayment(values);
          setShow(true);
          setHide(true);
        }}
      >
        {(formik: any) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
              }}
            >
              <form className="form-horizontal">
                <div className="formControl">
                  <label>Card Name :</label>
                  <input
                    name="cardName"
                    value={formik.values.cardName}
                    type="text"
                    placeholder="Card Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cardName && formik.errors.cardName && (
                    <motion.div
                      className="invalid-feedback d-block"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.cardName}
                    </motion.div>
                  )}
                </div>
                <div className="formControl">
                  <label>Card Number :</label>
                  <input
                    name="cardNumber"
                    value={formik.values.cardNumber}
                    type="text"
                    placeholder="Card Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <motion.div
                      className="invalid-feedback d-block"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.cardNumber}
                    </motion.div>
                  )}
                </div>
                <div className="formControl">
                  <label>Cvv :</label>
                  <input
                    name="cvv"
                    value={formik.values.cvv}
                    type="password"
                    placeholder="Cvv"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cvv && formik.errors.cvv && (
                    <motion.div
                      className="invalid-feedback d-block"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.cvv}
                    </motion.div>
                  )}
                </div>
              </form>
              <div className="fromBtn">
                <motion.button onClick={prev} whileTap={{ scale: 0.95 }}>
                  Back
                </motion.button>
                {hide ? (
                  <motion.button
                    onClick={handlerHide}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={formik.handleSubmit}
                    whileTap={{ scale: 0.95 }}
                  >
                    Show data
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        }}
      </Formik>
    </>
  );
};

export default Payment;
