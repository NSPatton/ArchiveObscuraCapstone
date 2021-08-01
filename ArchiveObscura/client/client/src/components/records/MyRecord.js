import React, { useEffect, useState } from "react";
import { getUserRecords } from "../../modules/recordManager";
import Record from "./Record";

const MyRecord = () => {
    const [records, setRecords] = useState([]);

    const getMyRecords = () => {
        return getUserRecords()
            .then(records => setRecords(records))
    }

    useEffect(() => {
        getMyRecords();
    }, []);

    return (
        <>
            <h1>My Records</h1>
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

export default MyRecord;