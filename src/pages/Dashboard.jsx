import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function Dashboard() {
  const [list,setList]=useState([]);
  const [sessions, setSessions] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    axios.get('http://103.60.212.74:8080/login/birthday')
    .then(res =>{setList(res.data?.result?.data)})
    .catch(err =>console.log(err))

    axios.get('http://103.60.212.74:8080/login/sessions')
    .then(res =>{setSessions(res.data?.result?.data)})
    .catch(err =>console.log(err))
    
    axios.get('http://103.60.212.74:8080/login/games')
    .then(res =>{setGames(res.data?.result?.data)})
    .catch(err =>console.log(err))
    .finally(() => {
      setLoading(false);
    });
  },[])
  // const [list] = useState([
  //   {
  //     name: "koteswararao",
  //     email: "koteswararaokusumanchi43@gmail.com",
  //     date_of_birth: "26-12",
  //     image: "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935819.png",
  //   },
  //   {
  //     name: "john doe",
  //     email: "johndoe@example.com",
  //     date_of_birth: "28-12",
  //     image: "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935819.png",
  //   },
  // ]);

   // {
    //   name: "rashmitha",
    //   email: "rashmitha@example.com",
    //   topic: "react",
    //   date_of_birth: "26-12",
    //   img: "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935819.png",
    //   file: null,
    // },
    // {
    //   name: "Jane Smith",
    //   email: "janesmith@example.com",
    //   date_of_birth: "27-12",
    //   topic: "Java",
    //   img:"https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    //   file: null,
    // },

  const today = new Date();
  const currentYear = today.getFullYear();
  const parseDate = (dateStr) => {
    const [day, month] = dateStr?.split("-").map(Number);
    return new Date(currentYear, month - 1, day);
  };

  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth()
    );
  };

  const isFuture = (date) => date > today;

  const sortByDate = (items, dateKey) =>
    [...items].sort((a, b) => parseDate(a[dateKey]) - parseDate(b[dateKey]));

  const filteredBirthdays = sortByDate(
    list.filter((user) => isToday(parseDate(user.date_of_birth)) || isFuture(parseDate(user.date_of_birth))),
    "date_of_birth"
  );

  const filteredSessions = sortByDate(
    sessions.filter((session) => isToday(parseDate(session.event_date)) || isFuture(parseDate(session.event_date))),
    "event_date"
  );

  const currentBirthday = filteredBirthdays.find((user) =>
    isToday(parseDate(user.date_of_birth))
  );

  const currentSession = filteredSessions.find((session) =>
    isToday(parseDate(session.event_date))
  );

  const handleFileChange = (e, sessionIndex) => {
    const file = e.target.files[0];
    setSessions((prevSessions) => {
      const updated = [...prevSessions];
      updated[sessionIndex].file = file;
      return updated;
    });
  };

  
  const Card = ({ title, subtitle, details, imgSrc, extraContent }) => (
    <div className="row mb-3">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body d-flex">
          <img
            src={imgSrc}
            alt={title}
            style={{ width: "8rem", height: "8rem", marginRight: "1rem" }}
          />
          <div className="d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{subtitle}</p>
            {details.map((detail, idx) => (
              <p key={idx} className="card-text">
                {detail}
              </p>
            ))}
            {extraContent}
          </div>
        </div>
      </div>
    </div>
  );
  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      {/* <h2>Previous Games</h2>
   
      {games.length >0 ? games.map((game)=>(
        <div className="row mb-3" key={game.id}>
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body d-flex">
            <img
              src={game.team_photo_url}
              alt={`Team${game.id}`}
              style={{ width: "8rem", height: "8rem", marginRight: "1rem" }}
            />
            <div className="d-flex flex-column">
              <h5 className="card-title">Name of the Game : {game.game_name}</h5>
              <p className="card-text">Game At the Location is : {game.location_name}</p>
              <h6>Team Members </h6>
              {game?.team_members?.map((detail, idx) => (
                <span key={idx} className="card-text">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      )):null} */}
      <p style={{ fontSize: "20px", color: "red" }}>Current & Upcoming Events</p>

      <h2>Today's Events</h2>
      {currentBirthday ? (
        <Card
          title={`Happy Birthday ${currentBirthday.full_name}!`}
          subtitle={currentBirthday.email}
          details={[`Birthday: ${currentBirthday.date_of_birth}-${currentYear}`]}
          imgSrc={currentBirthday.photo_image_url}
        />
      ) : null}

      {currentSession ? (
        <Card
          title={`Current session by ${currentSession.name}`}
          subtitle={currentSession.email}
          details={[
            `Topic: ${currentSession.title}`,
            `Date: ${currentSession.event_date}-${currentYear}`,
          ]}
          imgSrc={currentSession.file_upload_url}
          extraContent={
            <input
              type="file"
              onChange={(e) => handleFileChange(e, sessions.indexOf(currentSession))}
            />
          }
        />
      ) : null}

      {!currentBirthday && !currentSession && <p>No events today</p>}

      <h2>Upcoming Events</h2>
      {filteredBirthdays
        .filter((user) => isFuture(parseDate(user.date_of_birth)))
        .map((user, idx) => (
          <Card
            key={idx}
            title={`Upcoming Birthday: ${user.full_name}`}
            subtitle={user.email}
            details={[`Birthday: ${user.date_of_birth}-${currentYear}`]}
            imgSrc={user.image}
          />
        ))}

      {filteredSessions
        .filter((session) => isFuture(parseDate(session.event_date)))
        .map((session, idx) => (
          <Card
            key={idx}
            title={`Upcoming Session by ${session.name}`}
            subtitle={session.email}
            details={[
              `Topic: ${session.title}`,
              `Date: ${session.event_date}-${currentYear}`,
            ]}
            imgSrc={session.file_upload_url}
            extraContent={
              <input
                type="file"
                onChange={(e) => handleFileChange(e, idx)}
              />
            }
          />
        ))}

      {!filteredBirthdays.some((user) => isFuture(parseDate(user.date_of_birth))) &&
        !filteredSessions.some((session) => isFuture(parseDate(session.date))) && (
          <p>No upcoming events</p>
        )}
    </div>
  );
}

export default Dashboard;
