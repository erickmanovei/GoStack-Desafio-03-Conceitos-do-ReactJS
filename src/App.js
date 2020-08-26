import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const listRepositories = async () => {
      try{
        const { data } = await api.get('repositories');
        setRepositories(data);
      }catch(err) {
        console.log(err.message);
      }
    }
    listRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        title: `Repositório ${new Date().toISOString()}`,
        url: 'http://qualquercoisa.com',
        techs: [
          'PHP',
          'Node.js',
          'React'
        ],
      });
      setRepositories([...repositories, data]);
    } catch(err) {
      console.log(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const newRepositories = repositories.filter(e => e.id != id);
      setRepositories(newRepositories);
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(e => (
          <li key={e.id}>
            {e.title}

            <button onClick={() => handleRemoveRepository(e.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
