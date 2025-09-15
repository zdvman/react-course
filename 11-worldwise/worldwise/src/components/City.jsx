import ReactCountryFlag from 'react-country-flag';
import styles from './City.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function emojiToCountryCode(emoji) {
  // Get the code points of the emoji
  const codePoints = [...emoji].map((char) => char.codePointAt(0));
  // Regional indicator symbols start at 0x1F1E6 ('A')
  return codePoints
    .map((cp) => String.fromCharCode(cp - 0x1f1e6 + 65))
    .join('');
}

function City({ cities }) {
  const { id } = useParams();
  const currentCity = cities.find((city) => city.id === +id);
  // TEMP DATA
  // const currentCity = {
  //   cityName: 'Lisbon',
  //   emoji: '🇵🇹',
  //   date: '2027-10-31T15:59:59.138Z',
  //   notes: 'My favorite city so far!',
  // };

  const { cityName, emoji, date, notes, country } = currentCity;

  const countryCode = emojiToCountryCode(emoji);
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <ReactCountryFlag
            countryCode={countryCode.toUpperCase()}
            svg
            className={styles.emoji}
            aria-label={country}
          />
          {/* <span>{emoji}</span> {cityName} */}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
