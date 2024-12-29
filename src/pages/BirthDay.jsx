import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function Birthdays() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      // .get("http://192.168.0.170:8080/login/birthday")
      .get('http://103.60.212.74:8080/login/birthday')
      .then((response) => {
        const data = response.data.result?.data || [];
        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const previousBirthdays = list.filter((user) => {
    if (!user.date_of_birth) return false;
    
    const birthDate = new Date(user.date_of_birth);
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    return (
      (birthMonth < currentMonth) || 
      (birthMonth === currentMonth && birthDay < currentDay)
    );
  }).sort((a, b) => {
    const dayA = new Date(a.date_of_birth).getDate();
    const dayB = new Date(b.date_of_birth).getDate();
    return dayB - dayA;  
  });
  const todayBirthdays = list.filter((user) => {
    const birthDate = new Date(user.date_of_birth);
    const birthDay = birthDate.getDate();
    const birthMonth = birthDate.getMonth() + 1;
    return birthMonth === currentMonth && birthDay === currentDay;
  });

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
  
      <div className="mb-4">
        <h1 className="display-4 mb-2">Today's Birthdays</h1>
        {todayBirthdays.length > 0 ? (
          <div className="row">
            {todayBirthdays.map((user) => (
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
        {previousBirthdays.length > 0 ? (
          <div className="row">
            {previousBirthdays.map((user) => {
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
