import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function Birthdays() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      // .get("http://192.168.0.170:8080/login/birthday")
      .get('http://103.60.212.74:8080/login/birthday')
      .then((response) => {
        const data = response.data.result?.data || [];
        console.log("data",data)
        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
  }, []);

const today = new Date();
const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

const presentEvent = [];
const upcomingEvent = [];

list.forEach(person => {
  const dob = new Date(person.date_of_birth);
  const dobMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;

  if (dobMonthDay === todayMonthDay) {
    presentEvent.push(person);
  } else {
    upcomingEvent.push(person);
  }
});
upcomingEvent.sort((a, b) => {
  const dobA = new Date(a.date_of_birth);
  const dobB = new Date(b.date_of_birth);
  
  const aMonthDay = `${dobA.getMonth() + 1}-${dobA.getDate()}`;
  const bMonthDay = `${dobB.getMonth() + 1}-${dobB.getDate()}`;
  
  return aMonthDay.localeCompare(bMonthDay);
});

  if (!upcomingEvent.length > 0 && !presentEvent.length > 0) return <Loader />;

  return (
    <div className="container mt-4">
  
      <div className="mb-4">
        <h1 className="display-4 mb-2">Today's Birthdays</h1>
        {presentEvent.length > 0 ? (
          <div className="row">
            {presentEvent.map((user) => (
              <div key={user.uuid} className="col-12 mb-4">
                <div className="card">
                  <div className="card-body d-flex">
                    <img
                      src={user.photo_image_url}
                      alt={`${user.full_name}'s avatar`}
                      className="rounded me-4"
                      style={{ width: "128px", height: "128px", objectFit: "cover" }}
                    />
                    <div className="d-flex flex-column">
                      <h5 className="card-title h4 mb-2">{user.full_name}'s Birthday</h5>
                      <p className="card-text text-muted mb-1">{user.email}</p>
                      <p className="card-text">Birthday: {user.date_of_birth}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No birthdays today!</p>
        )}
      </div>
      <div className="mb-4 mt-5">
        <h1 className="display-4 mb-2">Previous Birthdays</h1>
        {upcomingEvent.length > 0 ? (
          <div className="row">
            {upcomingEvent.map((user) => {
              const birthDate = new Date(user.date_of_birth);
              const birthDay = birthDate.getDate();
              return (
                <div key={user.uuid} className="col-12 mb-4">
                  <div className="card">
                    <div className="card-body d-flex">
                      <img
                        src={user.photo_image_url}
                        alt={`${user.full_name}'s avatar`}
                        className="rounded me-4"
                        style={{ width: "128px", height: "128px", objectFit: "cover" }}
                      />
                      <div className="d-flex flex-column">
                        <h5 className="card-title h4 mb-2">{user.full_name}</h5>
                        <p className="card-text text-muted mb-1">{user.email}</p>
                        <p className="card-text">Birthday: {user.date_of_birth}</p>
                        <small className="text-muted mt-2">Was on {birthDay}th</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted">No previous birthdays!</p>
        )}
      </div>
    </div>
  );
}

export default Birthdays;


