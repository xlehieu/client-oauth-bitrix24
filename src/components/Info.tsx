"use client";
import React from 'react'
import { useState } from "react";
import axios from "axios";
const Info = () => {
    const [data, setData] = useState<any>(null);

    const callApi = async () => {
        const res = await axios.post("http://localhost:3000/api/call", {
        method: "user.current",
        payload: {},
        });
        setData(res.data);
    };
    return (
    <>
        <button onClick={callApi}>Gọi API user.current</button>

        {data && (
            <pre style={{ textAlign: "left", marginTop: 20 }}>
            {JSON.stringify(data, null, 2)}
            </pre>
        )}
    </>
  )
}

export default Info
