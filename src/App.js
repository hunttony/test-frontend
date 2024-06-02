import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Set your API Gateway URL
const API_BASE_URL = 'https://ty5ed10kod.execute-api.us-east-2.amazonaws.com/dev';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    username: '',
    email: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    cuisine: '',
    tagline: '',
    tags: '',
    bio: '',
    image: null,
    image1: null,
    image2: null,
    textColor: '',
    backgroundColor: '',
    backgroundImage: '',
    backgroundType: 'image',
    links: [],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/items`)
      .then(response => {
        console.log(response.data); // Check the response data
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in newItem.socialMedia) {
      setNewItem({
        ...newItem,
        socialMedia: { ...newItem.socialMedia, [name]: value }
      });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewItem({ ...newItem, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in newItem) {
      if (key === 'socialMedia' || key === 'links') {
        formData.append(key, JSON.stringify(newItem[key]));
      } else {
        formData.append(key, newItem[key]);
      }
    }

    axios.post(`${API_BASE_URL}/items`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setItems([...items, response.data]);
        setNewItem({
          username: '',
          email: '',
          name: '',
          address: '',
          phone: '',
          city: '',
          state: '',
          zip: '',
          cuisine: '',
          tagline: '',
          tags: '',
          bio: '',
          image: null,
          image1: null,
          image2: null,
          textColor: '',
          backgroundColor: '',
          backgroundImage: '',
          backgroundType: 'image',
          links: [],
          socialMedia: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
          }
        });
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Items</h1>
        <ul className="item-list">
          {(Array.isArray(items) ? items : []).map(item => (
            <li key={item.id}>
              <div className="item-card">
                {item.image && <img src={item.image} alt={item.name} className="item-image" />}
                {item.image1 && <img src={item.image1} alt={item.name} className="item-image" />}
                {item.image2 && <img src={item.image2} alt={item.name} className="item-image" />}
                <h3>{item.name}</h3>
                <p>{item.bio}</p>
                <p>{item.tagline}</p>
                <p>{item.cuisine}</p>
                <p>{item.tags}</p>
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={newItem.username} onChange={handleChange} />
          <input type="text" name="email" placeholder="Email" value={newItem.email} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={newItem.address} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={newItem.phone} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={newItem.city} onChange={handleChange} />
          <input type="text" name="state" placeholder="State" value={newItem.state} onChange={handleChange} />
          <input type="text" name="zip" placeholder="Zip" value={newItem.zip} onChange={handleChange} />
          <input type="text" name="cuisine" placeholder="Cuisine" value={newItem.cuisine} onChange={handleChange} />
          <input type="text" name="tagline" placeholder="Tagline" value={newItem.tagline} onChange={handleChange} />
          <input type="text" name="tags" placeholder="Tags" value={newItem.tags} onChange={handleChange} />
          <textarea name="bio" placeholder="Bio" value={newItem.bio} onChange={handleChange}></textarea>
          <input type="file" name="image" onChange={handleFileChange} />
          <input type="file" name="image1" onChange={handleFileChange} />
          <input type="file" name="image2" onChange={handleFileChange} />
          <input type="text" name="textColor" placeholder="Text Color" value={newItem.textColor} onChange={handleChange} />
          <input type="text" name="backgroundColor" placeholder="Background Color" value={newItem.backgroundColor} onChange={handleChange} />
          <input type="text" name="backgroundImage" placeholder="Background Image" value={newItem.backgroundImage} onChange={handleChange} />
          <input type="text" name="backgroundType" placeholder="Background Type" value={newItem.backgroundType} onChange={handleChange} />
          <input type="text" name="socialMedia.facebook" placeholder="Facebook" value={newItem.socialMedia.facebook} onChange={handleChange} />
          <input type="text" name="socialMedia.twitter" placeholder="Twitter" value={newItem.socialMedia.twitter} onChange={handleChange} />
          <input type="text" name="socialMedia.instagram" placeholder="Instagram" value={newItem.socialMedia.instagram} onChange={handleChange} />
          <input type="text" name="socialMedia.linkedin" placeholder="LinkedIn" value={newItem.socialMedia.linkedin} onChange={handleChange} />
          <button type="submit">Add Item</button>
        </form>
      </header>
    </div>
  );
}

export default App;
