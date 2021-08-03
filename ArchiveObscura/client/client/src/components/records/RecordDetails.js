import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getRecordById } from '../../modules/recordManager';
import { Card, CardBody } from 'reactstrap';
import { getAllTags } from '../../modules/tagManager';

const RecordDetails = () => {
    const [recordDetails, setRecordDetails] = useState({});
    const [tags, setTags] = useState([]);
    const { id } = useParams();

    const getTags = () => {
        getAllTags(id)
            .then(res => setTags(res))
    }

    const getRecordDetails = () => {
        getRecordById(id)
            .then(setRecordDetails)
    }

    useEffect(() => {
        getTags();
        getRecordDetails()
    }, [])

    return (
        <>
            <h2>Details</h2>
            <Card>
                <CardBody>
                    <h3>{recordDetails.ArtistName}</h3>
                    <img alt="image" src={recordDetails.imageUrl} />
                    <div>{recordDetails.title}</div>
                    <div>{recordDetails.description}</div>
                    <div>{recordDetails.tag?.name}</div>
                    <div>Posted on: {recordDetails.datePosted}</div>
                </CardBody>
            </Card>
        </>
    )
}

export default RecordDetails;