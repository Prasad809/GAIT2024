import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/Loader";
import token from "../../token";

function Addsessions() {
  const [obj, setObj] = useState({});
  const [array, setArray] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleObj = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };


  const validateInputs = () => {
    let validationErrors = {};
    if (!obj.name || obj.name.trim() === "") {
      validationErrors.name = "Presenter name is required.";
    }
    if (!obj.date) {
      validationErrors.date = "Date is required.";
    }
    if (!obj.topic || obj.topic.trim() === "") {
      validationErrors.topic = "Topic is required.";
    }
    if (!obj.session_type || obj.session_type.trim() === "") {
      validationErrors.session_type = "Session Type is required.";
    }
    if (!obj.file || obj.file.trim() === "") {
      validationErrors.file = "PPT file is required.";
    }
    return validationErrors;
  };

  const handleArray = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setArray([...array, obj]);
      const tokenKey=token.getUser();
      const auth_key=tokenKey?.response?.auth_token;
      const headers={
          Authorization:auth_key,
          'Content-Type': 'multipart/form-data'
      }
      const payload={
        feature_name:obj.topic,
        name:obj.name,
        title:obj.session_type,
        file_upload_url:obj.file,
        event_date:obj.date
      }
      console.log(payload,headers);
      axios.post('http://103.60.212.74:8080/login/sessions',obj,{headers:headers})
      .then(res =>console.log(res))
      .catch(err =>console.log(err))
      //.finally(()=>setLoading(false))
      // setObj({});
      setErrors({});
      // navigate("/home/sessions");      
    }
  };
  // if (loading) return <Loader />;
  return (
    <div className="container">
      <label htmlFor="">Presenter Name:</label>
      <input
        type="text"
        name="name"
        className="form-control"
        placeholder="Enter presenter name"
        onChange={handleObj}
        value={obj.name || ""}
      />
      {errors.name && <p className="text-danger">{errors.name}</p>}

      <label htmlFor="">Date:</label>
      <input
        type="date"
        name="date"
        className="form-control"
        placeholder="Enter presentation date"
        onChange={handleObj}
        value={obj.date || ""}
      />
      {errors.date && <p className="text-danger">{errors.date}</p>}

      <label htmlFor="">Topic:</label>
      <input
        type="text"
        name="topic"
        className="form-control"
        placeholder="Enter presentation topic"
        onChange={handleObj}
        value={obj.topic || ""}
      />
      {errors.topic && <p className="text-danger">{errors.topic}</p>}

      <label htmlFor="">Session Type:</label>
      <input
        type="text"
        name="session_type"
        className="form-control"
        placeholder="Enter presentation topic"
        onChange={handleObj}
        value={obj.session_type || ""}
      />
      {errors.session_type && <p className="text-danger">{errors.session_type}</p>}

      <label htmlFor="">PPT:</label>
      <input
        type="file"
        name="file"
        className="form-control"
        placeholder="Upload presentation PPT"
        onChange={(e) => handleObj({ target: { name: "file", value: e.target.value } })}
        value={obj.file || ""}
      />
      {errors.file && <p className="text-danger">{errors.file}</p>}

      <button className="btn btn-primary" onClick={handleArray}>
        Add
      </button>
      {/* <ul>
        {array.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul> */}
    </div>
  );
}

export default Addsessions;
