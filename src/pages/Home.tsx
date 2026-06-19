// src/pages/Home.tsx
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaChevronDown, FaChartLine, FaShieldAlt, FaBrain, FaRegCreditCard } from 'react-icons/fa';
import { FiMail, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Hero Section Animation
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Feature Card Animation
  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  // Pricing Animation
  const pricingVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  // FAQ Animation
  const faqVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.div variants={heroVariants}>
          <HeroTitle>Unleash Institutional Precision</HeroTitle>
          <HeroSubtitle>Powered by Advanced ICT Concepts & Bank-Level Algorithms</HeroSubtitle>
        </motion.div>
        
        <motion.div variants={heroVariants}>
          <HeroDescription>
            Our proprietary algorithms decode market structure with institutional precision, 
            giving you the edge to spot high-probability setups before they happen.
          </HeroDescription>
        </motion.div>
        
        <motion.div variants={heroVariants}>
          <BuyNowButton onClick={() => navigate('/buy')}>
            Get Instant Access
            <FaChevronDown style={{ marginLeft: '8px' }} />
          </BuyNowButton>
        </motion.div>
        
        <motion.div variants={heroVariants}>
          <ScrollIndicator>
            <MouseAnimation />
            <ScrollText>Scroll to Explore</ScrollText>
          </ScrollIndicator>
        </motion.div>
      </HeroSection>

      {/* Key Features Section */}
      <FeaturesSection ref={ref}>
        <SectionTitle>Your Trading Edge</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={featureVariants}
            >
              <FeatureCard>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            </motion.div>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      {/* MPPL Pricing Section */}
      <PricingSection>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={pricingVariants}
        >
          <PricingCard>
            <PricingHeader>
              <PricingTitle>MPPL Pricing Model</PricingTitle>
              <PricingSubtitle>Make Profit Pay Later</PricingSubtitle>
            </PricingHeader>
            
            <PriceContainer>
              <OriginalPrice>$1000</OriginalPrice>
              <CurrentPrice>$150</CurrentPrice>
              <PriceDescription>15% Down Payment</PriceDescription>
            </PriceContainer>
            
            <PricingTimeline>
              <TimelineStep>
                <StepNumber>1</StepNumber>
                <StepContent>
                  <StepTitle>Pay $150 Today</StepTitle>
                  <StepDescription>Get immediate access to our premium indicator</StepDescription>
                </StepContent>
              </TimelineStep>
              
              <TimelineStep>
                <StepNumber>2</StepNumber>
                <StepContent>
                  <StepTitle>Start Trading</StepTitle>
                  <StepDescription>Use our indicator to identify high-probability setups</StepDescription>
                </StepContent>
              </TimelineStep>
              
              <TimelineStep>
                <StepNumber>3</StepNumber>
                <StepContent>
                  <StepTitle>Pay the Rest From Profits</StepTitle>
                  <StepDescription>Only after you've made profits with our tool</StepDescription>
                </StepContent>
              </TimelineStep>
            </PricingTimeline>
            
            <BuyNowButton onClick={() => navigate('/buy')}>
              Claim Your Spot Now
            </BuyNowButton>
          </PricingCard>
        </motion.div>
      </PricingSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <SectionTitle>Trusted by Traders Worldwide</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <TestimonialCard>
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorLocation>{testimonial.location}</AuthorLocation>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* Results Section */}
      <ResultsSection>
        <SectionTitle>Real Performance</SectionTitle>
        <ResultsContainer>
          <ResultItem>
            <ResultNumber>94%</ResultNumber>
            <ResultLabel>Accuracy Rate</ResultLabel>
          </ResultItem>
          <ResultItem>
            <ResultNumber>3:1</ResultNumber>
            <ResultLabel>Average Risk/Reward</ResultLabel>
          </ResultItem>
          <ResultItem>
            <ResultNumber>24/7</ResultNumber>
            <ResultLabel>Market Coverage</ResultLabel>
          </ResultItem>
        </ResultsContainer>
      </ResultsSection>

      {/* FAQ Section */}
      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question}>
              <FAQQuestion
                onClick={() => {}}
                initial={false}
                animate={{ backgroundColor: '#f8f9fa' }}
                whileHover={{ backgroundColor: '#e9ecef' }}
              >
                {faq.question}
              </FAQQuestion>
              <motion.div
                variants={faqVariants}
                initial="hidden"
                animate="visible"
              >
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </motion.div>
            </FAQItem>
          ))}
        </FAQContainer>
      </FAQSection>

      {/* CTA Section */}
      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <CTATitle>Ready to Transform Your Trading?</CTATitle>
          <CTASubtitle>Join thousands of traders using our institutional-grade indicator</CTASubtitle>
          <BuyNowButton onClick={() => navigate('/buy')}>
            Get Started Now
          </BuyNowButton>
        </motion.div>
      </CTASection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  overflow-x: hidden;
`;

const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #2D3436 0%, #000000 100%);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==');
    opacity: 0.6;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #6C5CE7, #00CEFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDescription = styled.p`
  max-width: 700px;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.8);
`;

const BuyNowButton = styled(motion.button)`
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

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MouseAnimation = styled.div`
  width: 25px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  position: relative;
  margin-bottom: 8px;
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, 10px); opacity: 0; }
  }
`;

const ScrollText = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--gradient);
    border-radius: 2px;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background-color: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const PricingSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
`;

const PricingCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PricingHeader = styled.div`
  margin-bottom: 2rem;
`;

const PricingTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--dark);
`;

const PricingSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--primary);
  font-weight: 500;
`;

const PriceContainer = styled.div`
  margin: 2rem 0;
  position: relative;
  display: inline-block;
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: #999;
  text-decoration: line-through;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

const CurrentPrice = styled.span`
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
`;

const PriceDescription = styled.span`
  font-size: 1rem;
  color: #666;
  display: block;
  margin-top: 0.5rem;
`;

const PricingTimeline = styled.div`
  margin: 3rem 0;
  text-align: left;
`;

const TimelineStep = styled.div`
  display: flex;
  margin-bottom: 2rem;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 20px;
    top: 40px;
    bottom: -22px;
    width: 2px;
    background: var(--primary);
    opacity: 0.3;
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 1.5rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex-grow: 1;
`;

const StepTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background-color: white;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: var(--dark);
`;

const AuthorLocation = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const ResultsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #6C5CE7 0%, #00CEFF 100%);
  color: white;
`;

const ResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ResultItem = styled.div`
  text-align: center;
  flex: 1;
  min-width: 200px;
`;

const ResultNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ResultLabel = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const FAQSection = styled.section`
  padding: 5rem 2rem;
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
`;

const FAQContainer = styled.div`
  margin-top: 2rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

const FAQQuestion = styled(motion.div)`
  padding: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
`;

const FAQAnswer = styled.div`
  padding: 1.5rem;
  background: white;
  color: #555;
  line-height: 1.6;
  border-top: 1px solid #eee;
`;

const CTASection = styled.section`
  padding: 5rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #2D3436 0%, #000000 100%);
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Data
const features = [
  {
    icon: <FaChartLine />,
    title: "Advanced ICT Concepts",
    description: "Our indicator incorporates core ICT methodologies for precise market structure analysis and optimal trade entry points."
  },
  {
    icon: <FaBrain />,
    title: "Algorithmic Theory",
    description: "Leveraging complex algorithms that process market data at institutional levels to identify high-probability setups."
  },
  {
    icon: <FaShieldAlt />,
    title: "Bank-Level Data",
    description: "We process market data the same way large financial institutions do, giving you an unfair advantage."
  }
];

const testimonials = [
  {
    text: "This indicator has completely transformed my trading. The accuracy is unlike anything I've seen before.",
    name: "James T.",
    location: "New York, USA"
  },
  {
    text: "The MPPL model allowed me to get started even with limited capital. Now I'm consistently profitable.",
    name: "Sarah K.",
    location: "London, UK"
  },
  {
    text: "Finally an indicator that actually works. The bank-level data interpretation is game-changing.",
    name: "Michael R.",
    location: "Sydney, Australia"
  }
];

const faqs = [
  {
    question: "How does the MPPL model work?",
    answer: "MPPL (Make Profit Pay Later) allows you to access our premium indicator for just 15% of the total price upfront. You pay the remaining balance only after you've made profits using our tool."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept USDT via TRC20 or BEP20 networks. This allows for fast, secure, and low-fee transactions."
  },
  {
    question: "How do I get access after payment?",
    answer: "After submitting your payment details, our team will verify and send you the indicator file along with setup instructions within 24 hours."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Due to the digital nature of our product, we don't offer refunds. However, our MPPL model ensures you only pay the full amount after seeing results."
  }
];

export default Home;