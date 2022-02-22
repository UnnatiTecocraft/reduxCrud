import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import { delay } from "redux-saga/effects";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);

    useEffect(() => error && toast.error(error), [error]);

    if (loading) {
        return (
            <MDBSpinner style={{ marginTop: "150px" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
        );
    }

    const handleDelete = (id) => {
        if (
            window.confirm("Are you sure that you wanted to delete that user ?")
        ) {
            dispatch(deleteUserStart(id));
            toast.success("User Deleted Successfully");
        }
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <MDBTable>
                <MDBTableHead dark>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </MDBTableHead>
                {users &&
                    users.map((item, index) => (
                        <MDBTableBody key={index}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>
                                    <MDBBtn
                                        className="m-1"
                                        tag="a"
                                        color="none"
                                        onClick={() => handleDelete(item.id)}>
                                        <MDBTooltip title="Delete" tag="a">
                                            <MDBIcon
                                                fas
                                                icon="trash"
                                                style={{ color: "#dd4b39" }}
                                                size="lg"></MDBIcon>
                                        </MDBTooltip>
                                    </MDBBtn>
                                    {"  "}
                                    <Link to={`/editUser/${item.id}`}>
                                        <MDBTooltip title="Edit" tag="a">
                                            <MDBIcon
                                                fas
                                                icon="pen"
                                                style={{
                                                    color: "#55acee",
                                                    marginBottom: "10px",
                                                }}
                                                size="lg"></MDBIcon>
                                        </MDBTooltip>
                                    </Link>
                                    {"  "}
                                    <Link to={`/userInfo/${item.id}`}>
                                        <MDBTooltip title="View" tag="a">
                                            <MDBIcon
                                                fas
                                                icon="eye"
                                                style={{
                                                    color: "#3b5998",
                                                    marginBottom: "10px",
                                                }}
                                                size="lg"></MDBIcon>
                                        </MDBTooltip>
                                    </Link>
                                </td>
                            </tr>
                        </MDBTableBody>
                    ))}
            </MDBTable>
        </div>
    );
};

export default Home;
