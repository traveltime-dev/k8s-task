import React, { useEffect, useState } from 'react';
import { api } from './api';
import './App.css';

type Item = {
  name: string
  cost: number,
  id: number
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { name: 'Phone', cost: 170.55, id: 1 },
    { name: 'TV', cost: 400.35, id: 2 },
    { name: 'Phone Case', cost: 10.23, id: 3 },
  ]);
  const [response, setResponse] = useState('Press Calculate Above');
  const [apiAliveResponse, setApiAliveResponse] = useState('Not checked yet');
  const [responseStateColor, setResponseStateColor] = useState('#ffffff')

  const addItem = () => {
    setItems([...items, { name: 'Change item name', cost: 1, id: Date.now()}])
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const changeVal = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    setItems(items.map((item) => item.id !== id ? item : { ...item, [name]: value }))
  };

  const calculateOnServer = () => {
    setResponseStateColor("#006bf7");
    api.calculateCost({ items })
      .then((res) => {
        setResponse(res.data);
        setResponseStateColor("#13e70c");
      })
      .catch((e) => {
        console.error(e);
        setResponseStateColor("#e70f0f");
        setResponse(e.message)
      })
  };

  const checkIfAPIAlive = () => {
    api.checkIfServerIsAlive()
      .then((res) => {
        setApiAliveResponse(res.data);
      })
      .catch((e) => {
        console.error(e);
        setApiAliveResponse(e.message)
      })
  };

  useEffect(checkIfAPIAlive, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>NOTE: If any of the requests fails, you can find error message in console</p>
        <div className="api-alive-container">
          <div className="button" onClick={checkIfAPIAlive}>Check if API Is Alive</div>
          <div>Last Response: {apiAliveResponse}</div>
        </div>
        <div className="split" />
        <h3>Item list</h3>
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item">
              <input name="name" value={item.name} onChange={(e) => changeVal(e, item.id)} />
              <input name="cost" type="number" min={0} value={item.cost} onChange={(e) => changeVal(e, item.id)} />
              <div className="button remove" onClick={() => removeItem(item.id)}>Remove</div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <div className="button" onClick={addItem}>Add Item</div>
          <div className="button" onClick={calculateOnServer}>Calculate on server</div>
        </div>
        <div className="split" />
        <h3 style={{color: responseStateColor}}>Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
