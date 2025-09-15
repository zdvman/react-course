import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import ReactCountryFlag from 'react-country-flag';

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

function CityItem({ city }) {
  const {
    cityName,
    country,
    emoji,
    date,
    notes,
    id,
    position: { lat, lng },
  } = city;
  const countryCode = emojiToCountryCode(emoji);
  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <ReactCountryFlag
          countryCode={countryCode.toUpperCase()}
          svg
          className={styles.emoji}
          aria-label={country}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
