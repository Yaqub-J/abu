// File: src/aws-exports.js
// This file will be auto-generated when you run 'amplify push'

// File: src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure Amplify
Amplify.configure(awsExports);

ReactDOM.render(<App />, document.getElementById('root'));

// File: src/components/auth/SignIn.js
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const user = await Auth.signIn(username, password);
      console.log('Sign in successful:', user);
      onSignIn(user);
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In to ABU Alumni Platform</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="username">Username or Email</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;

// File: src/components/profile/AlumniProfile.js
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getAlumniProfile } from '../../graphql/queries';
import { updateAlumniProfile } from '../../graphql/mutations';

const AlumniProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const profileData = await API.graphql(
        graphqlOperation(getAlumniProfile, { id: userId })
      );
      
      const alumniProfile = profileData.data.getAlumniProfile;
      setProfile(alumniProfile);
      setFormData(alumniProfile);
    } catch (err) {
      console.error('Error fetching alumni profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedProfile = await API.graphql(
        graphqlOperation(updateAlumniProfile, { input: {
          id: userId,
          ...formData
        }})
      );
      
      setProfile(updatedProfile.data.updateAlumniProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="alumni-profile">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <div className="profile-field">
            <strong>Department:</strong> {profile.department}
          </div>
          <div className="profile-field">
            <strong>Graduation Year:</strong> {profile.graduationYear}
          </div>
          <div className="profile-field">
            <strong>Degree:</strong> {profile.degree}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default AlumniProfile;

// File: src/components/donations/DonationForm.js
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { getPaymentIntent } from '../../graphql/queries';
import { processPayment } from '../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

const DonationForm = ({ userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Generate a donation ID
      const donationId = uuidv4();
      
      // Get payment intent from backend
      const paymentIntentResult = await API.graphql(
        graphqlOperation(getPaymentIntent, {
          amount: parseFloat(amount),
          currency
        })
      );
      
      const { clientSecret, paymentIntentId } = paymentIntentResult.data.getPaymentIntent;
      
      // Confirm payment with Stripe
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }
      
      // Process payment on backend
      const processResult = await API.graphql(
        graphqlOperation(processPayment, {
          paymentIntentId,
          donationId
        })
      );
      
      if (processResult.data.processPayment.success) {
        setSuccess(true);
      } else {
        throw new Error(processResult.data.processPayment.message);
      }
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred during payment processing');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="donation-success">
        <h2>Thank You for Your Donation!</h2>
        <p>Your contribution will help support the ABU Alumni community.</p>
        <button onClick={() => setSuccess(false)}>Make Another Donation</button>
      </div>
    );
  }

  return (
    <div className="donation-form">
      <h2>Support the ABU Alumni Community</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Donation Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="NGN">Nigerian Naira (₦)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group checkbox">
          <input
            id="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label htmlFor="anonymous">Donate Anonymously</label>
        </div>
        <div className="form-group">
          <label>Card Details</label>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        <button type="submit" disabled={loading || !stripe}>
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;

// File: src/components/events/EventsList.js
import React, { useState, useEffect } from 'react';
import { API, graphql