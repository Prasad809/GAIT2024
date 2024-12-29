import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function Sports() {
    const [games, setGames] = useState([]);
    const [loading,setLoading] = useState(true);
  
  useEffect(()=>{
    axios.get('http://103.60.212.74:8080/login/games')
    .then(res =>{setGames(res.data?.result?.data)})
    .catch(err =>console.log(err))
    .finally(()=>{
        setLoading(false)
    })
  },[])
  if (loading) return <Loader />;
    return (
        <div>
            <h1>Sports</h1>
            <Card>
                {games.length > 0 ? games.map((game) => (
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
                )) : null}
            </Card>
        </div>
    )
}
export default Sports;