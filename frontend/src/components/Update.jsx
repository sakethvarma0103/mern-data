import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Update = () => 
{
    const params = useParams();
    const [name, setName] = useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState("");
    const [err,setError]=useState("");
    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`http://localhost:5000/search/${params.id}`);
                const result = await response.json();
                if (response.ok) {
                    setName(result.name);
                    setEmail(result.email);
                    setAge(result.age);
                } else {
                    setError(result.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
            }
        }
        getData();
    }, [params.id]);

    async function  handleSubmit(e) {
        const data= { name , email , age};
        e.preventDefault() ;
        const response= await fetch(`http://localhost:5000/update/${params.id}`, {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data)
         });
         const result=await response.json();
          if(!response.ok){
              setError(result.error);
           }else
           {
            window.location.href="/all";
           };
    }
    return(
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
        );
}
export default Update;