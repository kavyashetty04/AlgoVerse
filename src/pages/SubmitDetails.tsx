import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCheck, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2D3436;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #2D3436;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #6C5CE7;
    outline: none;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  min-height: 150px;
  
  &:hover {
    border-color: #6C5CE7;
    background: rgba(108, 92, 231, 0.05);
  }
`;

const FileUploadText = styled.span`
  font-size: 1rem;
  margin-top: 1rem;
  color: #2D3436;
`;

const FileUploadHint = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
`;

const FileName = styled.span`
  font-size: 1rem;
  color: #6C5CE7;
  font-weight: 500;
  word-break: break-all;
  text-align: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #6C5CE7, #00CEFF);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(108, 92, 231, 0.6);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #00B894;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SuccessTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2D3436;
`;

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  background: #6C5CE7;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00CEFF;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 10px;
  background: #ffebee;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
`;

const SubmitDetails = () => {
  const [tradingViewUsername, setTradingViewUsername] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setError('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setError('');

  //   if (!file || !tradingViewUsername || !email) {
  //     setError('Please fill all fields');
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('tradingViewUsername', tradingViewUsername);
  //   formData.append('email', email);
  //   formData.append('paymentProof', file);

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/submit-payment`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(await response.text());
  //     }

  //     setIsSubmitted(true);
  //   } catch (err) {
  //     setError('Failed to submit. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // if (isSubmitted) {
  //   return (
  //     <SuccessContainer>
  //       <SuccessIcon><FaCheck /></SuccessIcon>
  //       <SuccessTitle>Payment Submitted!</SuccessTitle>
  //       <SuccessMessage>
  //         Thank you! We've received your payment and sent a confirmation to {email}.
  //       </SuccessMessage>
  //       <BackButton onClick={() => navigate('/')}>Return Home</BackButton>
  //     </SuccessContainer>
  //   );
  // }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
  
    console.log('Submitting:', { tradingViewUsername, email, file });
  
    const formData = new FormData();
    formData.append('tradingViewUsername', tradingViewUsername);
    formData.append('email', email);
    formData.append('paymentProof', file);
  
    try {
      console.log('Sending to backend...');
      const response = await fetch(`${API_BASE_URL}/api/submit-payment`, {
        method: 'POST',
        body: formData,
      });
  
      console.log('Received response:', response);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!response.ok) throw new Error(data.error || 'Submission failed');
      
      setIsSubmitted(true);
    } catch (err) {
      console.error('Full error:', err);
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Step 2 — Confirm Your Payment</Title>
        <Subtitle>Upload your payment proof and provide your details</Subtitle>
      </Header>

      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>TradingView Username</Label>
            <Input
              type="text"
              value={tradingViewUsername}
              onChange={(e) => setTradingViewUsername(e.target.value)}
              placeholder="Enter your TradingView username"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Payment Proof (Screenshot)</Label>
            <FileUploadContainer onClick={triggerFileInput}>
              {fileName ? (
                <FileName>{fileName}</FileName>
              ) : (
                <>
                  <FaUpload size={24} />
                  <FileUploadText>Click to upload screenshot</FileUploadText>
                  <FileUploadHint>PNG, JPG up to 5MB</FileUploadHint>
                </>
              )}
              <HiddenFileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                required
              />
            </FileUploadContainer>
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Processing...' : 'Submit Payment'}
          </SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default SubmitDetails;