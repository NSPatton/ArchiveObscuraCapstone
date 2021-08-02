import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { addRecord } from "../../modules/recordManager";

const RecordForm = () => {

    const [record, setRecord] = useState({
        title: "",
        artistName: "",
        description: "",
        imageUrl: "",
        tagId: 1
    })

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newRecord = { ...record }
        let selectedValue = evt.target.value
        newRecord[evt.target.id] = selectedValue
        setRecord(newRecord)
    };

    const handleSave = (event) => {
        event.preventDefault();
        addRecord(record)
            .then(() =>
                history.push("/record")
            );
    };

    return (
        <>
            <Form onSubmit={handleSave}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" title="title" placeholder="Title"
                        defaultValue={record.title} onChange={handleInputChange} />
                    <Label for="artistName">Artist Name</Label>
                    <Input id="artistName" type="text" artistName="artistName" placeholder="Artist Name"
                        defaultValue={record.artistName} onChange={handleInputChange} />
                    <Label for="description">Description</Label>
                    <Input id="description" type="text" description="description" placeholder="Description"
                        defaultValue={record.description} onChange={handleInputChange} />
                    <Label for="imageUrl">Image Url</Label>
                    <Input id="imageUrl" type="text" imageUrl="imageUrl" placeholder="ImageUrl"
                        defaultValue={record.imageUrl} onChange={handleInputChange} />
                </FormGroup>
                <Button className="btn btn-primary">Submit</Button>
            </Form>
        </>
    )
}

export default RecordForm;