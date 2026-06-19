// src/components/PaymentForm.tsx
import { useState, useRef } from 'react';
import { API_BASE_URL } from '../config/api';

export default function PaymentForm() {
  const [username, setUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('tradingViewUsername', username);
    
    if (fileInputRef.current?.files?.[0]) {
      formData.append('paymentProof', fileInputRef.current.files[0]);
    } else {
      setMessage('Please select a payment screenshot');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-payment`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Payment submission failed');
      }

      const result = await response.json();
      setMessage('Payment submitted successfully!');
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to submit payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Submit Payment Details</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            TradingView Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your TradingView username"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="paymentProof" style={{ display: 'block', marginBottom: '5px' }}>
            Payment Screenshot:
          </label>
          <input
            id="paymentProof"
            type="file"
            ref={fileInputRef}
            accept="image/*,.pdf"
            required
            style={{ width: '100%' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{
            padding: '10px 15px',
            background: isSubmitting ? '#ccc' : '#6C5CE7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Payment'}
        </button>

        {message && (
          <div style={{
            padding: '10px',
            background: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            borderRadius: '4px'
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}