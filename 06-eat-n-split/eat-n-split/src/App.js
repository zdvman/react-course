import { useState } from 'react';
import './index.css';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([...initialFriends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelectedFriend(selected) {
    setSelectedFriend((prev) => (prev?.id === selected?.id ? null : selected));
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((prev) => !prev);
  }

  function handleAddFriend(newFriend) {
    setFriends((prev) => [...prev, newFriend]);
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((prev) =>
      [...prev].map((el) => {
        if (el.id === selectedFriend.id) {
          return { ...el, balance: el.balance + value };
        } else {
          return el;
        }
      })
    );

    setSelectedFriend(null);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul className=''>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const { name, image, balance, id } = friend;
  const selected = selectedFriend?.id === id;
  return (
    <li className={selected ? 'selected' : ''}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className='red'>
          You owe {name} {Math.abs(balance)}€
        </p>
      )}
      {balance > 0 && (
        <p className='green'>
          {name} owes you {balance}€
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {selected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  }
  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>Friend's name</label>
      <input
        type='text'
        placeholder="Input Friend's name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <label>Image URL</label>
      <input
        type='text'
        placeholder='Input image URL'
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const { name } = selectedFriend;
  const [bill, setBill] = useState('');
  const [userExpense, setUserExpense] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');
  const friendExpense = bill ? bill - userExpense : '';

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;
    const value = whoIsPaying === 'user' ? friendExpense : -userExpense;
    onSplitBill(value);
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      <label>Bill value</label>
      <input
        type='text'
        // placeholder='Input bill value'
        value={bill}
        onChange={(e) => {
          setBill(+e.target.value);
        }}
      />

      <label>Your expense</label>
      <input
        type='text'
        // placeholder='Input expense'
        value={userExpense}
        onChange={(e) => {
          setUserExpense(
            +e.target.value > bill ? userExpense : +e.target.value
          );
        }}
      />
      <label>{name}'s expense</label>
      <input type='text' disabled value={friendExpense} />
      <label>Who is paying the bill?</label>
      <select onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
