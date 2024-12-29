import axios from "axios";
import { useState } from "react";
import token from "../../token";

function Addadmin() {
    const [obj, setobj] = useState({});
    const [array, setarray] = useState([]);
    const handleobj = (e) => {
        const { name, value } = e.target;
        setobj({ ...obj, [name]: value});
    }
   
    const handlearray = () => {
        const tokenKey=token.getUser();
        const auth_key=tokenKey?.response?.auth_token;
        const headers={
            Authorization:auth_key,
            'Content-Type': 'multipart/form-data'
        }
        const payload={
            full_name:obj.name,
            email:obj.email,
            password:obj.password,
            designation:obj.designation,
            date_of_birth:obj.date,
            photo_image_url:obj.img
        }
        axios
        .post('http://103.60.212.74:8080/login/create',payload,{headers:headers})
        .then(res =>console.log(res.data))
        .catch(err =>console.log(err))
        setarray([...array, obj]);
    }

    return (
        <div>
            <h1>Add Admin</h1>
            <div>
                <label htmlFor="">FullName:</label>
                <input type="text" name="name" value={obj.name || ""} className="form-control"  placeholder="Enter your fullname.." onChange={handleobj} />
                <label htmlFor="">Email:</label>
                <input type="text" name="email" value={obj.email || ""} className="form-control" placeholder="Enter your email.." onChange={handleobj} />
                <label htmlFor="">Date:</label>
                <input type="date" name="date" value={obj.date || ""} className="form-control" placeholder="Enter your date.." onChange={handleobj} />
                <label htmlFor="">Password:</label>
                <input type="password" name="hobbies" value={obj.password || ""} className="form-control"  placeholder="Enter your Password.." onChange={handleobj} />
                <label htmlFor="">Designation:</label>
                <input type="text" name="designation" value={obj.designation || ""} className="form-control"  placeholder="Enter your designation.." onChange={handleobj} />
                <label htmlFor="">img:</label>
                <input type="file" name="img" value={obj.img  || ""} className="form-control" onChange={handleobj} />
                <button onClick={handlearray } className="btn btn-primary">AddUser</button>
            </div>
        </div>
    )
}

export default Addadmin;