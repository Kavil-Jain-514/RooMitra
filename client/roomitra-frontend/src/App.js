import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
function App() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await api.get("/api/v1/users");
      console.log(response.data);
      setUsers(response.data);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUsers();
  },[])
  return (
    <div className="App">
      {users.map(user => (
        <div key={user.id}> 
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
