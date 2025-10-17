import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, age, gender } = formData;

    if (!name || !email || !age || !gender) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmittedData(formData);
        alert('Email sent successfully!');
      } else {
        console.error(result);
        alert('Failed to send email. Please try again later.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Check console for details.');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={{ textAlign: 'center' }}>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" style={styles.button}>Submit</button>
        </form>

        {submittedData && (
          <div style={styles.output}>
            <h3>Your Submitted Info:</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Age:</strong> {submittedData.age}</p>
            <p><strong>Gender:</strong> {submittedData.gender}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9'
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    width: 300
  },
  input: {
    width: '100%',
    padding: 10,
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: 4
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 10,
    width: '100%',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  output: {
    marginTop: 20,
    padding: 10,
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 4
  }
};
