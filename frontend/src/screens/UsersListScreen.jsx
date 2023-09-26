import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useDeleteUserMutation, useGetUsersDataMutation } from "../store/adminApiSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


const UsersListScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [data, setData] = useState(true);

    const [getUsersData, { isLoading }] = useGetUsersDataMutation();
    const [deleteUser] = useDeleteUserMutation();


    useEffect(() => {
        async function fetchUser() {
            const res = await getUsersData().unwrap("");
            setUsers(res.user);
        }
        fetchUser();
    }, [data, getUsersData]);

    const filteredUsers = users.filter(user => {
        const userName = user.name.toLowerCase();
        const searchValue = search.toLowerCase();
        return userName.includes(searchValue);
    });

    const deleteHandler = async (id) => {
        await deleteUser(id).unwrap("");
        setData(prevData => !prevData);
    };

    return (
        <Container>
            <Form.Group className="mt-3 mt-5 d-flex align-items-center" controlId="searchForm">
                <Form.Label className="me-3">Search:</Form.Label>
                <Form.Control
                    style={{ width: "30vw", marginBottom: "10px" }}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>
            <Link to='/admin/users/add'><Button className="btn-primary rounded-5 mt-4">
                Add User</Button></Link>
            {isLoading && <Loader />}
            <div className="table-responsive">

                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button className="btn-danger" onClick={() => deleteHandler(user._id)}>Delete</Button>
                                    </td>
                                    <td>
                                        <Link to={`/admin/users/update/${user._id}`}><Button className="btn-success">Update</Button></Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </Table>

            </div>
        </Container>
    );
};

export default UsersListScreen;
