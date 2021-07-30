import React, { useEffect, useState } from "react";
import { getAllRecords } from "../../modules/recordManager";
import Record from "./Record"

const RecordList = () => {
    const [records, setRecords] = useState([]);

    const getRecords = () => {
        getAllRecords().then(records => setRecords(records));
    }

    useEffect(() => {
        getRecords();
    }, [])

    return (
        <>
            <h1>Home</h1>
            <div className="container">
                <div className="row justify-content-center">
                    {records.map((record) => (
                        <Record record={record} key={record.id} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default RecordList;