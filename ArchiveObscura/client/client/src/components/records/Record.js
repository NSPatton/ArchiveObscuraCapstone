import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import { deleteRecord } from "../../modules/recordManager";
import firebase from "firebase/app"
import "firebase/auth"

const Record = ({ record, getRecords }) => {

    const currentUser = firebase.auth().currentUser

    const deleteARecord = (event => {
        event.preventDefault()
        const confirmDelete = window.confirm("Are you sure you want to delete this record?")
        if (confirmDelete) {
            deleteRecord(record.id).then(() => { getRecords() })
        }
    })



    const ShowEditAndDelete = () => {
        if (currentUser.email === record.userProfile.email) {
            return (
                <>
                    <div>
                        <div className="editbutton">
                            <Link to={`/edit/${record.id}`}>
                                <button type="button" className="btn-primary-edit">Edit</button>
                            </Link>
                        </div>
                        <button color="danger" onClick={deleteARecord}>Delete</button>
                    </div>
                </>
            )
        } else {
            return null;
        }
    }



    return (
        <Card >
            <p className="text-left px-2">Posted By: <Link to={`/user/${record.userProfile.id}`}>{record.userProfile.name}</Link></p>
            <CardBody>
                <img src={record.imageUrl} alt={record.artistname} />
                <br />
                <p>
                    <Link to={`/record/${record.id}`}>
                        <strong>{record.artistname}</strong>
                    </Link>
                </p>
                <p>{record.title}</p>
                <ShowEditAndDelete />
                <Link to={`/details/${record.id}`}><button>Details</button></Link>
            </CardBody>
        </Card >
    )
}

export default Record;