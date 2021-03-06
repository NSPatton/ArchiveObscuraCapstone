import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { addRecord } from "../../modules/recordManager";
import { getAllTags } from "../../modules/tagManager";

const RecordForm = () => {

    const emptyRecord = {
        title: "",
        artistName: "",
        description: "",
        imageUrl: "",
        tagId: 0
    }

    const [record, setRecord] = useState(emptyRecord);

    const [tag, setTag] = useState([]);

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'nsprojects')
        setLoading(true)
        const res = await fetch(
            '	https://api.cloudinary.com/v1_1/dzneo29rj/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
        record.imageUrl = file.secure_url
    }

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newRecord = { ...record }
        let selectedValue = evt.target.value
        newRecord[evt.target.id] = selectedValue
        setRecord(newRecord)
    };

    const getTags = () => {
        return getAllTags()
            .then(tagsFromAPI => {
                setTag(tagsFromAPI)
            })
    }

    const handleSave = (event) => {
        event.preventDefault();
        if (record.title === '' || record.artistName === '' || record.description === '' || record.tagId === 0) {
            window.alert('title, artist name, description, and tag are required fields')
            setRecord({
                title: '',
                artistName: '',
                description: '',
                imageUrl: '',
                tagId: 0

            })
            history.push("/record/add")
        }
        else {
            addRecord(record)
                .then(() => {
                    history.push('/')
                })
        }
    };

    useEffect(() => {
        getTags();
    }, [])

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
                    {/* <Label for="imageUrl">Image Url: </Label> */}
                    <Input id="imageUrl" type="file" imageUrl="imageUrl" placeholder="Upload An Image"
                        defaultValue={record.imageUrl} onChange={uploadImage} />
                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={image} style={{ width: '300px' }} />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="Tag">Tag</Label>
                    <Input id="tagId" type="select" name="tagId"
                        value={record.tagId} onChange={handleInputChange}>
                        <option value="0">Select a Tag</option>
                        {tag.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <Button className="btn btn-primary">Submit</Button>
                <Link to="/">
                    <Button className="btn-primary-button">Return</Button>
                </Link>
            </Form>
        </>
    )
}

export default RecordForm;