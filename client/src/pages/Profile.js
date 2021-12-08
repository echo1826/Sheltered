import React from "react";
import { useQuery } from "@apollo/client";
//imports from material
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button'
//imports from utils
import Auth from "../utils/auth";
import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";
import './Profile.css'


export default function Profile() {
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: Auth.getProfileToken().data._id },
  });
  const me = useQuery(QUERY_ME);
  if(!me.loading) {
    console.log(me.data?.me)
  }

  const date = Date(data?.user.createdAt)
  const joinedDate = new Date(date)
  const month = joinedDate.toLocaleString('default', { month: 'long' });
  const year = joinedDate.toLocaleString('default', {year: 'numeric'});


  const likedDogs = me.data?.me.pets || [];

  let profileDogs;
  if (!loading) {
    console.log(data?.user.pets);
    profileDogs = likedDogs.slice(0, 3);
  }

  const goLogin = () => {
    window.location.assign("/");
  };

  if (Auth.isLoggedIn()) {
    return (
    
      <div className= "userProfile">
        <h1>{me.data?.me.username}</h1>
        <div className="avatar">
        <Avatar alt="Avatar" src="https://avatarfiles.alphacoders.com/170/thumb-1920-170799.jpg" sx={{ width: 156, height: 156 }} />
        <ul>
          <li>Location: {data?.user.location || 'N/A'}</li>
          <li>Member Since: {month} {year}</li>
        </ul>
        </p>
      
        <div className="profileDogs">

            {loading ? (
              <React.Fragment></React.Fragment>
            ) : (
              profileDogs.map((dog) => {
                return (
                  <div key={dog._id} container className = "dogCard">
                          <img class="dogImage" src={dog.photo[0].small} alt={dog.name} />
                          <h2>{dog.name}</h2>
                          <p>{dog.breed.primary}</p>
                          <p>
                            {dog.size} | {dog.gender} | {dog.age}
                          </p>
                          </div>
                );
              })
            )}
        </div>
        <div> 
          <Link to="/likes" underline="none" className='profileLink'><Button className='profileBtn' style={{backgroundColor: '#F2F2F2', color: '#000'}} variant = "contained">View all your liked dogs</Button></Link>
        </div>
      </div>);
  } else {
    const style = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    };

    return (
      <div style={style}>
        <h1>You are not logged in!!</h1>
        <Button className='profileBtn' onClick={goLogin}>Login</Button>
      </div>
    );
  }
}
