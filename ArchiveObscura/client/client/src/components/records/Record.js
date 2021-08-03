import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import { deleteRecord } from "../../modules/recordManager";

const Record = ({ record, getRecords }) => {

    const deleteARecord = (event => {
        event.preventDefault()
        const confirmDelete = window.confirm("Are you sure you want to delete this record?")
        if (confirmDelete) {
            deleteRecord(record.id).then(() => { getRecords() })
        }
    })



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
                <button color="danger" onClick={deleteARecord}>Delete</button>
            </CardBody>
        </Card>
    )
}

export default Record;