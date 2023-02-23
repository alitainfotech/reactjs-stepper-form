import { useContext } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const phoneRegExp = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;

const AddSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is a required field"),
  lastName: Yup.string().trim().required("Last name is a required field"),
  age: Yup.string()
    .trim()
    .matches(phoneRegExp, "Age is not valid")
    .required("Age is a required field"),
});

const Personal = () => {
  const { personal, setPersonal, next }: any = useContext(MultiStepFormContext);

  return (
    <>
      <Formik
        initialValues={personal}
        validationSchema={AddSchema}
        onSubmit={(values) => {
          setPersonal(values);
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
              <form className="form-horizontal" onSubmit={formik.handleSubmit}>
                <div className="formControl">
                  <label>Name :</label>
                  <input
                    name="name"
                    value={formik.values.name}
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <motion.div
                      className="invalid-feedback"
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.name}
                    </motion.div>
                  )}
                </div>
                <div className="formControl">
                  <label>Last Name :</label>
                  <input
                    name="lastName"
                    value={formik.values.lastName}
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <motion.div
                      className="invalid-feedback "
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.lastName}
                    </motion.div>
                  )}
                </div>
                <div className="formControl">
                  <label>Age :</label>
                  <input
                    name="age"
                    value={formik.values.age}
                    type="text"
                    placeholder="Age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.age && formik.errors.age && (
                    <motion.div
                      className="invalid-feedback "
                      initial={{ y: -15 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", bounce: 0.25 }}
                    >
                      {formik.errors.age}
                    </motion.div>
                  )}
                </div>
              </form>
              <div className="fromBtn fromBtnSingle">
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

export default Personal;
