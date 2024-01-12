import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescripton] = useState('');
  const [transactions, setTranactions] = useState([]);

  // useEffect  --- 
  useEffect(() => {
    getTransactions().then((transactions) => {
      setTranactions(transactions);
    })
  })
  //  to get data from backend
  const getTransactions = async () => {
    const getUrl = 'http://localhost:5000/api/transactions';
    const transactions = await fetch(getUrl);
    const json = await transactions.json();
    return json;
  }

  // send data to backend
  const addNewTransaction = (e) => {
    e.preventDefault();
    const postUrl = 'http://localhost:5000/api/transaction';
    const price = name.split(' ')[0];  // to get first part of the name
    fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ price, name: name.substring(price.length + 1), description, datetime })
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      }
      );

  }

let balance = 0;
for(const transaction of transactions){
  balance = balance+transaction.price;
}
balance=balance.toFixed(2);
// to get fraction
let fraction = balance.split('.')[1];
// decimal part
balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}<span>.{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'+200 new sampung TV'}
          />
          <input type="datetime-local"
            value={datetime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <div className='description'>
          <input type="text"
            value={description}
            onChange={(e) => setDescripton(e.target.value)}
            placeholder={'description'} />
        </div>
        <button>Add new transaction</button>
      </form>
      {transactions.length > 0 && transactions.map((transaction) => (

        <div className='transactions'>
          <div className='transaction'>
            <div className='left'>
              <div className='name'>{transaction.name}</div>
              <div className='description'>{transaction.description}</div>
            </div>
            <div className='right'>
              <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>{transaction.price}</div>
              <div className='datatime'>2022-12-18 14:45</div>
            </div>
          </div>
        </div>

      ))}


    </main>
  );
}

export default App;
