import React, { useEffect, useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
};

const AddEditUser = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const { name, email, phone, address } = formValue;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { users } = useSelector((state) => state.users);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleUser = users.find((item) => item.id === Number(id));
            setFormValue({ ...singleUser });
        } else {
            setEditMode(false);
            setFormValue({ ...initialState });
        }
    }, [id]);

    console.log(editMode);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && phone && address) {
            if (!editMode) {
                dispatch(createUserStart(formValue));
                toast.success("User Added Successfully");
                setTimeout(() => navigate("/"), 500);
            } else {
                dispatch(updateUserStart({ id, formValue }));
                setEditMode(false);
                toast.success("User Updated Successfully");
                setTimeout(() => navigate("/"), 500);
            }
        }
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <MDBValidation
            className="row g-3"
            style={{ marginTop: "100px" }}
            noValidate
            onSubmit={handleSubmit}>
            <p className="fs-2 fw-bold">
                {!editMode ? "Add User Details" : "Update User Details"}
            </p>
            <div
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}>
                <MDBInput
                    value={name || ""}
                    name="name"
                    type="text"
                    onChange={onInputChange}
                    required
                    label="Name"
                    validation="Please provide a name"
                    invalid
                />
                <br />
                <MDBInput
                    value={email || ""}
                    name="email"
                    type="email"
                    onChange={onInputChange}
                    required
                    label="Email"
                    validation="Please provide an email"
                    invalid
                />
                <br />
                <MDBInput
                    value={phone || ""}
                    name="phone"
                    type="number"
                    onChange={onInputChange}
                    required
                    label="Phone"
                    validation="Please provide a phone"
                    invalid
                />
                <br />
                <MDBInput
                    value={address || ""}
                    name="address"
                    type="text"
                    onChange={onInputChange}
                    required
                    label="Address"
                    validation="Please provide an address"
                    invalid
                />
                <br />
                <div className="col-12">
                    <MDBBtn style={{ marginRight: "10px" }} type="submit">
                        {!editMode ? "Add User" : "Update User"}
                    </MDBBtn>
                    <MDBBtn onClick={() => navigate("/")} color="danger">
                        Go back
                    </MDBBtn>
                </div>
            </div>
        </MDBValidation>
    );
};

export default AddEditUser;
