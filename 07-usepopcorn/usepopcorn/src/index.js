import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './StarRatig';
// import './index.css';
// import App from './App';

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        color={'blue'}
        maxRating={10}
        onSetRating={(x) => setMovieRating(x)}
      />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Test />
    <StarRating maxRating={5} />
    <StarRating
      maxRating={5}
      color='red'
      size={24}
      className='test'
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
      defaultRating={3}
    />
    {/* <App /> */}
  </React.StrictMode>
);
