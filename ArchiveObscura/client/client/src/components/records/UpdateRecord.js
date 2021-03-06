import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Formtext } from "reactstrap";
import { updateRecord, getRecordById } from "../../modules/recordManager";
import { getAllTags } from "../../modules/tagManager"

const RecordEdit = () => {
    const [editRecord, setEditRecord] = useState();
    const [tag, setTag] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const getRecordToEdit = () => {
        getRecordById(id).then((record) => setEditRecord(record))

    }

    const handleInputChange = (evt) => {
        const newRecord = { ...editRecord }
        let selectedValue = evt.target.value
        newRecord[evt.target.id] = selectedValue
        setEditRecord(newRecord)
    };

    const getTags = () => {
        return getAllTags()
            .then(tagsFromAPI => {
                setTag(tagsFromAPI)
            })
    }

    const handleUpdate = (evt) => {
        evt.preventDefault();
        setIsLoading(true);

        const editedRecord = {
            id: id,
            title: editRecord.title,
            artistName: editRecord.artistName,
            description: editRecord.description,
            imageUrl: editRecord.imageUrl,
            tagId: editRecord.tagId
        }
        updateRecord(editRecord)
            .then(() => {
                history.push('/');
            });
    };

    useEffect(() => {
        getTags();
        getRecordToEdit()
    }, [])

    return (
        <>
            <Form onSubmit={handleUpdate}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" title="title" placeholder="Title"
                        defaultValue={editRecord?.title} onChange={handleInputChange} />
                    <Label for="artistName">Artist Name</Label>
                    <Input id="artistName" type="text" artistName="artistName" placeholder="Artist Name"
                        defaultValue={editRecord?.artistName} onChange={handleInputChange} />
                    <Label for="description">Description</Label>
                    <Input id="description" type="text" description="description" placeholder="Description"
                        defaultValue={editRecord?.description} onChange={handleInputChange} />
                    <Label for="imageUrl">Image Url</Label>
                    <Input id="imageUrl" type="text" imageUrl="imageUrl" placeholder="ImageUrl"
                        defaultValue={editRecord?.imageUrl} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Tag">Tag</Label>
                    <Input id="tagId" type="select" name="tagId"
                        value={editRecord?.tagId} onChange={handleInputChange}>
                        <option value="0">Select a Tag</option>
                        {tag.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <Button className="btn btn-primary" disabled={isLoading} onClick={handleUpdate}>Submit</Button>
                <Link to="/">
                    <Button className="btn-primary-button">Return</Button>
                </Link>
            </Form>
        </>
    )

}

export default RecordEdit;