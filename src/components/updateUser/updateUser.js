import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./updateUser.css";
const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
        try {
           const response = await fetch(`https://crud-node-2.onrender.com/api/user/${id}`);
           const data = await response.json();
           console.log(data);
           setFormData(data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
},[id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       try {
        const response = await fetch(`https://crud-node-2.onrender.com/api/user/${id}`,{
            method: "PUT",
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
    <div className="container">
      <div className="center-form">
        <Form onSubmit={handleSubmit}>
        <h3 className="text-center">Update User</h3>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
         
          <Button varient="success" type="submit" className="btn-success">
            Update 
          </Button>{" "}      
          <Link varient="secondary" to="/">
          <Button varient="success" type="submit" className="btn-secondary">
          <i class="bi bi-arrow-left-circle-fill"></i> Back
          </Button> 
          </Link>
        </Form>
      </div>{" "}
      </div>
    </>
  );
};

export default UpdateUser;
