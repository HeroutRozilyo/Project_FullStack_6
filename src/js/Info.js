
import '../css/info.css'
import profilePicture from '../Image/profileImage.png';
function Info() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile Picture" />
      </div>
      <div className="profile-info">
       
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>
    </div>
  );
}

export default Info;
