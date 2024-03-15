import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
// import { useFormik } from 'formik';
import Swal from "sweetalert2";
import "./postUser.css";
import {  Link, useNavigate } from "react-router-dom";


// const validate = values => {
//   const errors = {};
//   if (!values.name) {
//     errors.name = 'Required';
//   }


//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

  
//   if (!values.phone) {
//     errors.phone = 'Required';
//   } 
//   return errors;
// };

const PostUser = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     phone: '',
      
  //   },
  //   validate,
  //   onSubmit: () => {
  //   },
  // });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // const[errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "User added in successfully"
    });
    // const validationErrors = {}

    //  if(!formData.name.trim()){
    //   validationErrors.name = "name is required"
    //  }

    //  if(!formData.email.trim()){
    //   validationErrors.email = "email is required"
    //  } else if(!/\S+@\S\.\S+/.test(formData.email)){
    //   validationErrors.email ="email is not valid"
    //  }

    //  if(!formData.phone.trim()){
    //   validationErrors.phone = "phone number is required"
    //  }

    //  setErrors(validationErrors)

    //  if(Object.keys(validationErrors).length === 0) {
    //   alert("Form Submittted Successfully")
    //  }

       try {
        const response = await fetch("https://crud-node-2.onrender.com/api/user",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
        })
        console.log(response);

        const data = await response.json(response);
        console.log(data);
        navigate("/");
       } catch (error) {
          console.log(error);
       }
  };
  return (
    <>
      <div className="center-form col-sm-12">
       
        <Form onSubmit={handleSubmit}>
        <h3 className="text-center">Post New User</h3>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
       {/* {formik.errors.name ? <div>{formik.errors.name}</div> : null} */}
            
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
       {/* {formik.errors.email ? <div>{formik.errors.email}</div> : null} */}
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
       {/* {formik.errors.phone ? <div>{formik.errors.phone}</div> : null} */}
          </Form.Group>

          <Button varient="success" type="submit" className=" btn-success">
            Submit
          </Button>{" "}
         
          <Link varient="secondary" to="/">
          <Button varient="success" type="submit" className="btn-secondary">
          <i class="bi bi-arrow-left-circle-fill"></i> Back
          </Button> </Link>
        </Form>
      </div>
    </>
  );
};

export default PostUser;
