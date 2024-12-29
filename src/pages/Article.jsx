import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

function Article() {
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    axios
      // .get("http://localhost:3000/Articles")
      .get("http://103.60.212.74:8080/login/articles")
      .then((res) => {
        setArticle(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      });
  }, []);
if(loading) return <Loader />
  return (
    <>
      <div className="container">
        <h1 className="text-center mb-4">Articles</h1>

        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-danger"
            style={{
              padding: "10px 20px",
              borderRadius: "50px"
            }}
            onClick={() => navigate("/home/addarticle")}
          >
            Add Article
          </button>
        </div>

        <div className="row">
          {article.length > 0 ? (
            article.map((item) => (
              <div className="col-12 " style={{marginTop:"2rem"}} key={item.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><b>Title of the Article  : </b>{item.title}</h5>
                    <p className="card-text"><b>Content of the Article  : </b>{item.article_content}</p>
                    <span><b>Created By :</b> Mr.{item.name}</span><span><b>   &  Created At :</b> {item.created_at}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No articles found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Article;
