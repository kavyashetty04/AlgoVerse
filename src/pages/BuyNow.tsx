// src/pages/BuyNow.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaArrowRight, FaQrcode, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BuyNow = () => {
  const [activeTab, setActiveTab] = useState<'trc20' | 'bep20'>('trc20');
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  return (
    <BuyNowContainer>
      <BuyNowHeader>
        <BuyNowTitle>Step 1 — Secure Your Spot</BuyNowTitle>
        <BuyNowSubtitle>Choose your payment method below</BuyNowSubtitle>
      </BuyNowHeader>

      <PaymentTabs>
        <TabButton 
          active={activeTab === 'trc20'} 
          onClick={() => setActiveTab('trc20')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          USDT (TRC20)
        </TabButton>
        <TabButton 
          active={activeTab === 'bep20'} 
          onClick={() => setActiveTab('bep20')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          USDT (BEP20)
        </TabButton>
      </PaymentTabs>

      <PaymentDetails>
        {activeTab === 'trc20' ? (
          <>
            <QRCodeContainer>
              <FaQrcode size={150} />
              <QRText>Scan to Pay</QRText>
            </QRCodeContainer>
            
            <AddressContainer>
              <AddressTitle>Wallet Address (TRC20)</AddressTitle>
              <AddressBox>
                <Address>TYsmfVZzZL2E5F6S5Qq5h7n4dX2g7R8j9K</Address>
                <CopyButton onClick={() => copyToClipboard('TYsmfVZzZL2E5F6S5Qq5h7n4dX2g7R8j9K')}>
                  <FaCopy />
                </CopyButton>
              </AddressBox>
              <NetworkFee>Network: TRON | Fee: $1</NetworkFee>
            </AddressContainer>
          </>
        ) : (
          <>
            <QRCodeContainer>
              <FaQrcode size={150} />
              <QRText>Scan to Pay</QRText>
            </QRCodeContainer>
            
            <AddressContainer>
              <AddressTitle>Wallet Address (BEP20)</AddressTitle>
              <AddressBox>
                <Address>0x8fD89fB2d2a7Ef123a5Bd3cB5F5C4f5D6E7F8G9H</Address>
                <CopyButton onClick={() => copyToClipboard('0x8fD89fB2d2a7Ef123a5Bd3cB5F5C4f5D6E7F8G9H')}>
                  <FaCopy />
                </CopyButton>
              </AddressBox>
              <NetworkFee>Network: Binance Smart Chain | Fee: $0.30</NetworkFee>
            </AddressContainer>
          </>
        )}
      </PaymentDetails>

      <PaymentInstructions>
        <InstructionTitle>Payment Instructions:</InstructionTitle>
        <InstructionList>
          <InstructionItem>Send exactly $150 USDT to the address above</InstructionItem>
          <InstructionItem>Take a screenshot of your payment confirmation</InstructionItem>
          <InstructionItem>Click the button below to submit your payment details</InstructionItem>
        </InstructionList>
      </PaymentInstructions>

      <NextButton 
        onClick={() => navigate('/submit-details')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Submit Payment Details <FaArrowRight style={{ marginLeft: '8px' }} />
      </NextButton>
    </BuyNowContainer>
  );
};

// Styled Components
const BuyNowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BuyNowHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const BuyNowTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--dark);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BuyNowSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const PaymentTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled(motion.button)<{ active: boolean }>`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  background: ${props => props.active ? 'var(--primary)' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px dashed #ddd;
  border-radius: 10px;
`;

const QRText = styled.span`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddressTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--dark);
`;

const AddressBox = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Address = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
  word-break: break-all;
  flex-grow: 1;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--secondary);
  }
`;

const NetworkFee = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const PaymentInstructions = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InstructionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--dark);
`;

const InstructionList = styled.ol`
  padding-left: 1.5rem;
`;

const InstructionItem = styled.li`
  margin-bottom: 1rem;
  color: #555;
  line-height: 1.6;
`;

const NextButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(108, 92, 231, 0.6);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export default BuyNow;