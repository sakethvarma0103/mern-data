import React, { useState } from "react";

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);

    const [err, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addUser = { name, email, age };

        const user = await fetch('http://localhost:5000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addUser)
        });
    const result = await user.json();
        if(user.status === 201) {
            console.log(user);
            setError("");
            setName("");
            setEmail("");
            setAge(0);
            window.location.href = "/all"
        } else {
            setError(result.error);
        };

    }

    return (
        <div className="container my-2">
            {err && <div class="alert alert-danger">
                {err}
            </div>}
            <h2 className="text-center">Enter data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Create;