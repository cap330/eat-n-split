import { useState } from 'react';

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

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleSetShowAddFriend() {
    setShowAddFriend(show => !show);
  }

  function handleSetFriends(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleSetFriends} />}
        <Button onClick={handleSetShowAddFriend}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    //const id = crypto.randomUUID();
    const id = Math.floor(Math.random() * 100) + 1;

    const newFriend = { name, image: `${image}?img=${id}`, balance: 0, id };

    onAddFriend(newFriend);

    //console.log(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <label>📸 Imgage URL</label>
      <input type="text" value={image} onChange={e => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>😩 Your expenses</label>
      <input type="text" />

      <label>🥹 X's expenses</label>
      <input type="text" disabled={true} />

      <label>Who is paying the bill</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

export default App;
