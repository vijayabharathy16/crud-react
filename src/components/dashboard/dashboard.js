import { useEffect, useState } from "react";
import { Col, Table, Row, Container, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Dashboard = () =>{
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
           const response = await fetch("http://localhost:5000/api/user");
           const data = await response.json();
           console.log(data);
           setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {  
        fetchUsers();
    },[]);

    const handleUpdate = (userId) => {
       
       navigate(`/user/${userId}`);
       
    }

    const handleDelete = async (userId) => {  
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
            title: "User Deleted in successfully"
          });
        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`,{
                method:"DELETE"
                
            });
          
            console.log(response);
           
            if(response.ok){
                
                fetchUsers();
             
            }
            // const data = await response.json();
            // console.log(data);
            // setUsers(data);
         } catch (error) {
             console.log(error);
         }
    }

    return(
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                <h3 className="text-center">List of users</h3>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) =>(
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Button variant="primary"
                                        onClick={() => handleUpdate(user._id)}>
                                        <i className="bi bi-pencil-square"></i>
                                        </Button>{" "}
                                        <Button variant="danger"
                                        onClick={() => handleDelete(user._id)}>
                                        <i className="bi bi-trash-fill"></i>
                                        </Button>
                                    </td>
                                    
                                </tr>
                            
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Dashboard;