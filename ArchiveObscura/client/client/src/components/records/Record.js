import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom"

const Record = ({ record }) => {
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
            </CardBody>
        </Card>
    )
}

export default Record;