import React, { useState } from 'react';
import axios from 'axios';

const IdCardForm = ({ onCardGenerated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/idcards', data);
      onCardGenerated(response.data);

      console.log('res data: ',response.data);
      alert('ID Card generated successfully!');
    } catch (error) {
      console.error('Error generating ID card:', error);
      alert('Error generating ID card');
    }
  };

  return (
    <div className="card-form">
      <h2>Generate New ID Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Profile: </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
        </div>
        
        <button type="submit">Generate ID Card</button>
      </form>
    </div>
  );
};

export default IdCardForm;