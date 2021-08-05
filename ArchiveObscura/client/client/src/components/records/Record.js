import React from "react";
import { Card, CardBody, CardImg, CardTitle, Button } from "reactstrap";
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
                                <Button type="button" className="btn-primary-edit">Edit</Button>
                            </Link>
                        </div>
                        <Button color="danger" onClick={deleteARecord}>Delete</Button>
                    </div>
                </>
            )
        } else {
            return null;
        }
    }



    return (
        <>
            <div>
                <Card >
                    <CardBody>
                        <h3><CardTitle src={record.id}>{record.artistName}</CardTitle></h3>
                        <p className="text-left px-2">Posted By: {record.userProfile.name}</p>
                        <CardImg src={record.imageUrl} alt={record.artistname} />
                        <br />
                        <h4>{record.title}</h4>
                        <ShowEditAndDelete />
                        <Link to={`/details/${record.id}`}><Button>Details</Button></Link>
                    </CardBody>
                </Card >
            </div>
        </>
    )
}

export default Record;