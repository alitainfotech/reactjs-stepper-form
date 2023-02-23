import { useContext } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const phoneRegExp = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;

const AddSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is a required field"),
  address: Yup.string().trim().required("Address is a required field"),
});

const Contact = () => {
  const { contact, setContact, next, prev }: any =
    useContext(MultiStepFormContext);

  return (
    <>
      <Formik
        initialValues={contact}
        validationSchema={AddSchema}
        onSubmit={(values) => {
          setContact(values);
          next();
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
                  <label>Email :</label>
                  <input
                    name="email"
                    value={formik.values.email}
                    type="text"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <motion.div
                      className="invalid-feedback d-block"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.email}
                    </motion.div>
                  )}
                </div>
                <div className="formControl">
                  <label>Phone No :</label>
                  <input
                    name="phone"
                    value={formik.values.phone}
                    type="text"
                    placeholder="Phone No."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <motion.div
                      className="invalid-feedback d-block"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.phone}
                    </motion.div>
                  )}
                </div>
                <div className="formControl">
                  <label>Address :</label>
                  <input
                    name="address"
                    value={formik.values.address}
                    type="text"
                    placeholder="Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <motion.div
                      className="invalid-feedback d-block"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.address}
                    </motion.div>
                  )}
                </div>
              </form>
              <div className="fromBtn">
                <motion.button
                  onClick={prev}
                  className="backBtn"
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={formik.handleSubmit}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          );
        }}
      </Formik>
    </>
  );
};

export default Contact;
