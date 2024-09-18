import React, { useState, useEffect } from 'react';
import api from '../utils/axios';


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const createUser = async () => {
    try {
      const response = await api.post('/api/users', {
        name,
        email,
        password,
        role,
      });
      console.log('User created:', response.data);
      fetchUsers(); // Refresh the users list after creating
    } catch (error:any) {
        if (error.response.status === 400){
            console.log('Validation error response:', error.response.data); // Log to inspect the structure
            alert("Please input the data correctly")
            
        }else{
                    // For other errors (500 or network issues)
               alert("An error occurred while creating the user 500?");

        }
    
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Create User</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
