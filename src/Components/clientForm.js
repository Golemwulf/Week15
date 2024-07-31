import { useState, useEffect } from 'react';


export default function ClientForm(){
    
  const API_URL =
  'https://667b271abd627f0dcc91d6ca.mockapi.io/Promineo_Tech_API/user';

const [users, setUsers] = useState([{}]);

const [newUserName, setNewUserName] = useState(' ');
const [newUserJobTitle, setNewUserJobTitle] = useState(' ');
const [newUserCompanyName, setNewUserCompanyName] = useState(' ');

const [updatedUserName, setUpdatedUserName] = useState(' ');
const [updatedJobTitle, setUpdatedJobTitle] = useState(' ');
const [updatedCompanyName, setUpdatedCompanyName] = useState(' ');


const getUsers = () => {
  fetch(API_URL)
    .then((data) => data.json())
    .then((data) => setUsers(data));
};

useEffect(() => {
  getUsers();
}, []);

const filterByID = (id) => {
  let answer = users.filter(user => user.id !== id);
  return answer;
}
const deleteUser = (id) => {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then(()=>setUsers(filterByID(id)))
  .then(() => getUsers());
};

const postNewUser = (e) => {
  e.preventDefault();
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newUserName,
      jobTitle: newUserJobTitle,
      companyName: newUserCompanyName,
    }),
  })
  .then(()=> setUsers([...users, {
    name: newUserName,
    jobTitle: newUserJobTitle,
    companyName: newUserCompanyName,
  }

  ]))
  .then(() => getUsers());
  setNewUserName('')
  setNewUserJobTitle('')
  setNewUserCompanyName('')
};

const updateUser = (e, userObject) => {
  e.preventDefault();

  let updatedUserObject = {
    ...userObject,
    name: updatedUserName,
    jobTitle: updatedJobTitle,
    companyName: updatedCompanyName,
  };

  fetch(`${API_URL}/${userObject.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserObject),
  }).then(() => getUsers());
};

return (
  <div>

  <div className="card bg-transparent">
      <div className='card-body bg-dark text-light text-center' id='header'>
      <h1>User List</h1>
      </div>
      <br></br>
   
    {users.map((user, index) => (
      <div className="mapContainer card-body bg-dark text-light" key={index}>
        <div className='card-body'>
          Name: {user.name} <br></br>
          Job Title: {user.jobTitle} <br></br>
          Company Name: {user.companyName} <br></br>
          <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
        <div>
        <form>
          <label>Update Name: </label>
          <input onChange={(e) => setUpdatedUserName(e.target.value)}></input>
          <br></br>
          <label>Update Job Title: </label>
          <input onChange={(e) => setUpdatedJobTitle(e.target.value)}></input>
          <br></br>
          <label>Update Company Name: </label>
          <input
            onChange={(e) => setUpdatedCompanyName(e.target.value)}
          ></input>
          <br></br>
          <button className='btn btn-primary' onClick={(e) => updateUser(e, user)}>Update</button>
        </form>
        </div>
      </div>
      
    ))}
      <div className='card-body bg-dark text text-light text-center' id='new-user'>
        <h3>Add New User</h3>
    <form>
      <label>Name: </label>
      <input onChange={(e) => setNewUserName(e.target.value)} value={newUserName} ></input>
      <br></br>
      <label>Job Title: </label>
      <input onChange={(e) => setNewUserJobTitle(e.target.value)} value={newUserJobTitle}></input>
      <br></br>
      <label>Company Name: </label>
      <input onChange={(e) => setNewUserCompanyName(e.target.value)} value={newUserCompanyName}></input>
      <br></br>
      <br></br>
      <button className='btn btn-primary form-control' onClick={(e) => postNewUser(e)}>Submit</button>
    </form>
    </div>
  </div>
  </div>
);
}


