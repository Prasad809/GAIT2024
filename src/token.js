function token(){
    //token
    let user={};
    //setToken
    const setUser=(token)=>{
        user=token
        return true
    }
    //getToken
    const getUser=()=>user;
    return{
        setUser,
        getUser,
    }
}

export default token();