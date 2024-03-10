import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const All = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("http://localhost:5000");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, []);


    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Server responded with a status of ${response.status}`);
            } else {
                // Update state using functional form of setData
                setData(prevData => prevData.filter((item) => item._id !== id));
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    } 

    
    return (
        <div className="container my-2">
            <h2 className="text-center">All Data</h2>
            <div className="row">
            {data && data.map((e,index) => (
                    <div key={index} className="col-3">
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title text-center">{e.name}</h5>
                                <h5 className="card-subtitle mb-2 text-center">{e.email}</h5>
                                <h6 className="card-subtitle mb-2 text-muted text-center">{e.age}</h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/all" className="card-link" onClick={()=> handleDelete(e._id)}>Delete</Link>
                                    <Link to={`/update/${e._id}`} className="card-link">Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default All;
