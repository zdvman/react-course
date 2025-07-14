import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (direction) => {
    if (direction === 'next' && step < messages.length) {
      setStep((prev) => prev + 1);
    } else if (direction === 'previous' && step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <button className='close' onClick={() => setIsOpen((prev) => !prev)}>
        &times;
      </button>
      <div className={`steps ${isOpen ? '' : 'hidden'}`}>
        <div className='numbers'>
          <div className={step >= 1 ? 'active' : ''}>1</div>
          <div className={step >= 2 ? 'active' : ''}>2</div>
          <div className={step >= 3 ? 'active' : ''}>3</div>
        </div>
        <p className='message'>
          Step {step}: {messages[step - 1]}
        </p>
        <div className='buttons'>
          <button
            onClick={() => handleClick('previous')}
            style={{ backgroundColor: '#7950f2', color: '#fff' }}
          >
            Previous
          </button>
          <button
            onClick={() => handleClick('next')}
            style={{ backgroundColor: '#7950f2', color: '#fff' }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
