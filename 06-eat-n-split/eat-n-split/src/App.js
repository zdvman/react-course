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
  const [action, setAction] = useState(false);
  function handleClick() {
    setAction((prev) => !prev);
  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList />
        <FormAddFriend />
        <Button onClick={handleClick}>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = [...initialFriends];
  return (
    <ul className=''>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  const { name, image, balance } = friend;
  return (
    <li>
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
      <Button>Select</Button>
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

function FormAddFriend() {
  const [friend, setFriend] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type='text'
        // placeholder="Input Friend's name"
        value={friend}
        onChange={(e) => {
          setFriend(e.target.value);
        }}
      />

      <label>Image URL</label>
      <input
        type='text'
        // placeholder='Input image URL'
        // value={friend}
        // onChange={(e) => {
        //   setFriend(e.target.value);
        // }}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with a X</h2>
      <label>Bill value</label>
      <input
        type='text'
        // placeholder="Input Friend's name"
        // value={friend}
        // onChange={(e) => {
        //   setFriend(e.target.value);
        // }}
      />

      <label>Your expense</label>
      <input
        type='text'
        // placeholder='Input image URL'
        // value={friend}
        // onChange={(e) => {
        //   setFriend(e.target.value);
        // }}
      />
      <label>X's expense</label>
      <input
        type='text'
        disabled
        // placeholder="Input Friend's name"
        // value={friend}
        // onChange={(e) => {
        //   setFriend(e.target.value);
        // }}
      />
      <label>Who is paying the bill?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
