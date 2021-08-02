import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { addRecord } from "../../modules/recordManager";

const RecordForm = () => {

    const [record, setRecord] = useState({
        title: "",
        artistName: "",
        description: "",
        imageUrl: ""
    })

    history = useHistory();

    const handleSave = (event) => {
        event.preventDefault();
        addRecord(record)
            .then(() =>
                history.pushState("/record")
            );
    };

    return (
        <>
            <Form onSubmit={handleSave}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" title="title" placeholder="Title"
                        defaultValue={record.title} onChange={event => setRecord({ title: event.target.value })} />
                    <Label for="artistName">Artist Name</Label>
                    <Input id="artistName" type="text" artistName="artistName" placeholder="Artist Name"
                        defaultValue={record.artistName} onChange={event => setRecord({ artistName: event.target.value })} />
                    <Label for="description">Description</Label>
                    <Input id="description" type="text" description="description" placeholder="Description"
                        defaultValue={record.description} onChange={event => setRecord({ description: event.target.value })} />
                    <Label for="imageUrl">Image Url</Label>
                    <Input id="imageUrl" type="text" imageUrl="imageUrl" placeholder="ImageUrl"
                        defaultValue={record.imageUrl} onChange={event => setRecord({ imageUrl: event.target.value })} />
                </FormGroup>
            </Form>
        </>
    )
}