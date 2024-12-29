import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

const Session = () => {
  const hr = "Hr";
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("Hr");
  const [sessions, setSessions] = useState([]);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    axios
      // .get("http://localhost:3000/sessions")
      .get("http://103.60.212.74:8080/login/sessions")
      .then((response) => {
        setSessions(response.data.result.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFileChange = (event, index) => {
    const newSessions = [...sessions];
    newSessions[index].file = event.target.files[0];
    setSessions(newSessions);
  };

  const sortedSessions = [...sessions].sort((a, b) => {
    const [dayA, monthA] = a.event_date.split("-").map(Number);
    const [dayB, monthB] = b.event_date.split("-").map(Number);
    if (monthA !== monthB) return monthB - monthA;
    return dayB - dayA;
  });

  const today = new Date();
  const currentDate = { day: today.getDate(), month: today.getMonth() + 1 };

  const isFutureSession = (session) => {
    const [day, month] = session.event_date.split("-").map(Number);
    return (
      month > currentDate.month ||
      (month === currentDate.month && day >= currentDate.day)
    );
  };

  const currentSessions = sortedSessions.filter(isFutureSession);
  const previousSessions = sortedSessions.filter(
    (session) => !isFutureSession(session)
  );

  if (userRole !== hr) {
    return <p>You do not have permission to view this page.</p>;
  }
  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sessions</h1>
        <div style={{ textAlign: "right" }}>
          <button
            className="btn btn-danger"
            style={{
              padding: "10px 20px",
              borderRadius: "10rem",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "end",
              
            }}
            onClick={() => navigate("/home/addsession")}
          >
            Add Session
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xl font-semibold mb-4">Current Sessions</p>
        {currentSessions.length > 0 ? (
          currentSessions.map((session, index) => (
            <SessionCard
              key={index}
              session={session}
              index={index}
              handleFileChange={handleFileChange}
            />
          ))
        ) : (
          <p className="text-gray-500">No upcoming sessions.</p>
        )}
      </div>

      <div>
        <p className="text-xl font-semibold mb-4">Previous Sessions</p>
        {previousSessions.length > 0 ? (
          previousSessions.map((session, index) => (
            <SessionCard
              key={index}
              session={session}
              index={index}
              handleFileChange={handleFileChange}
            />
          ))
        ) : (
          <p className="text-gray-500">No previous sessions.</p>
        )}
      </div>
    </div>
  );
};

const SessionCard = ({ session, index, handleFileChange }) => {
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    if (session.file instanceof File) {
      const url = URL.createObjectURL(session.file);
      setFileURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileURL(session.file);
    }
  }, [session.file]);

  return (
    <div className="card mb-4">
      <div className="p-4 d-flex align-items-start space-x-4">
        <img
          src={session.file_upload_url}
          alt={`${session.name}'s profile`}
          className="img"
          style={{ width: "8rem", height: "8rem", marginRight: "1rem" }}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{session.name}</h3>
          {/* <p className="text-gray-600 mb-2">{session.email}</p> */}
          <div className="d-flex flex-wrap gap-4">
            <div className="d-flex align-items-center">
              <span className="text-gray-500 mr-2">Topic:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {session.title}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-gray-500 mr-2">Date:</span>
              <span className="text-gray-700">{session.event_date}</span>
            </div>
          </div>
          <div className="mt-4">
            <h4>
              PPT:
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => handleFileChange(e, index)}
              />
            </h4>
            {fileURL && (
              <div className="mt-2 text-gray-600">
                <span>
                  Uploaded File:{" "}
                  <a
                    href={fileURL}
                    download={
                      session.file instanceof File ? session.file.name : "file"
                    }
                    className="text-blue-500 underline"
                  >
                    {session.file instanceof File
                      ? session.file.name
                      : "Download File"}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
