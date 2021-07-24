import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import axios from "axios";
import { getAllEmployees } from "../redux/user/user.action";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
    transition: {
      staggerChildren: 0.5,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      staggerChildren: 0.4,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const AddUser = ({ getAllEmployees ,history}) => {
  const [userDetails, setUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const change = (e) => {
    const { value, name } = e.target;
    setUserDetail({ ...userDetails, [name]: value });
  };
  console.log(userDetails);
  const addEmployee = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: "http://localhost:8090/users",
      data: {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
      },
    })
    .then((res) => {
      console.log("am done posting");
      console.log(res);
      setUserDetail({
        name: "",
        email: "",
        phone: "",
      });
    }).then(() => {
      history.push('/')
    })
    .then(getAllEmployees())
  };

  return (
    <motion.div
      className="container order flex justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-2/3 ">
        <motion.div variants={childVariants}></motion.div>
        <h1 className="text-gray-600 font-semibold pt-6 mb-4 focus:border-gray-500 focus:outline-none focus:ring-0 text-2xl">
          Add New User
        </h1>

        <motion.form variants={childVariants} className="pl-4">
          <div className="flex flex-col">
            <label className="text-xl mb-5" htmlFor="">
              Name
            </label>
            <input
              onChange={change}
              type="text"
              name="name"
              className="px-3 py-4 w-full md:w-2/3 lg:w-1/2 border-2 rounded-lg shadow-md"
              id="name"
              placeholder="name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl my-5" htmlFor="">
              Email
            </label>
            <input
              onChange={change}
              type="email"
              name="email"
              className="px-3 py-4 w-full md:w-2/3 lg:w-1/2 rounded-lg shadow-md border-2"
              placeholder="email"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-xl my-5">
              Phone Number:
            </label>
            <input
              onChange={change}
              type="text"
              name="phone"
              className="form px-3 py-4 w-full md:w-2/3 lg:w-1/2 rounded-lg shadow-md border-2"
              id="phone"
              placeholder="phone number"
            />
          </div>
        </motion.form>
              <button
                onClick={addEmployee}
                type="submit"
                className="text-xl cursor-pointer py-3 active:bg-gray-200 border-2 px-3 rounded-xl mt-6 "
              >
                Add user
              </button>
        <motion.div variants={childVariants}></motion.div>
      </div>
    </motion.div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getAllEmployees: () => dispatch(getAllEmployees()),
});
// const mapStateToProps = createStructuredSelector({
//   // contacts: selectCurrentUserContacts
//   // users: selectCurrentUser
//   allEmployees: selectEmployeesDetail
// });

export default withRouter( connect(null, mapDispatchToProps)(AddUser));
