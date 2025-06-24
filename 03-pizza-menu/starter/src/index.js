import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import pizzaData from './data.js'; // Adjust the path as necessary

function App() {
  return (
    <div className='container'>
      <Header />
      <Menu pizzaData={pizzaData} />
      <Footer />
    </div>
  );
}

function Header() {
  const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' };
  return (
    <header className='header'>
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu({ pizzaData }) {
  return (
    <main className='menu'>
      <h2>Our Menu</h2>

      {pizzaData?.length > 0 && (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes made with love and
            passion. All our pizzas are made with the finest ingredients and
            baked in a traditional wood-fired oven.
          </p>
          <ul className='pizzas'>
            {pizzaData.map((pizza, index) => (
              <Pizza key={index + pizza.name} pizzaData={pizza} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

function Pizza({ pizzaData }) {
  const { name, ingredients, photoName, price, soldOut } = pizzaData;
  return (
    <li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? 'Sold Out' : `${price}€`}</span>
      </div>
    </li>
  );
}

function Order({ openHours = 12, closeHours = 22 }) {
  return (
    <div className='order'>
      <p>
        We are happy to welcome you between {openHours}:00 pm and {closeHours}
        :00 pm
      </p>
      <button className='btn'>Order Now</button>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHours = 12;
  const closeHours = 22;
  const isOpen = hour >= openHours && hour < closeHours;
  const currentDate = new Date().getFullYear();
  // return React.createElement(
  //   'footer',
  //   null,
  //   '© ' + currentDate + ' Pizza Menu. All rights reserved.'
  // );
  return (
    <footer className='footer'>
      {isOpen ? (
        <Order closeHours={closeHours} />
      ) : (
        <p>We are closed for today</p>
      )}

      <br />
      <p>
        Open from {openHours}:00 to {closeHours}:00
      </p>
      <p>© {currentDate} Pizza Menu. All rights reserved.</p>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before 18 used ReactDOM.render
// ReactDOM.render(<App />, document.getElementById('root'));
