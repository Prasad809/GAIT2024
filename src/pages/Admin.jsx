import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Admin() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      // .get('http://103.60.212.74:8080/login/create')
      .then((res) =>{ setTasks(res.data)})
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        setError("Failed to delete the task. Please try again.");
      });
  };

  return (
    <div>
      <h1>Admin</h1>
      <div style={{ textAlign: "right" }}>
        <button
          className="btn btn-danger"
          style={{
            padding: "10px 20px",
            borderRadius: "10rem",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => navigate("/home/Addadmin")}
        >
          Add Admin
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        border="1"
        style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Hobbies</th>
            <th>Designation</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.email}</td>
                <td>{task.date}</td>
                <td>{task.hobbies}</td>
                <td>{task.designation}</td>
                <td>{task.img}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ padding: "5px 10px", borderRadius: "5px" }}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
