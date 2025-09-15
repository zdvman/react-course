import ReactCountryFlag from 'react-country-flag';
import styles from './CountryItem.module.css';

function emojiToCountryCode(emoji) {
  // Get the code points of the emoji
  const codePoints = [...emoji].map((char) => char.codePointAt(0));
  // Regional indicator symbols start at 0x1F1E6 ('A')
  return codePoints
    .map((cp) => String.fromCharCode(cp - 0x1f1e6 + 65))
    .join('');
}

function CountryItem({ country }) {
  const countryCode = emojiToCountryCode(country.emoji);
  return (
    <li className={styles.countryItem}>
      {/* <span>{country.emoji}</span> */}
      <ReactCountryFlag
        countryCode={countryCode.toUpperCase()}
        svg
        className={styles.emoji}
        aria-label={country}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
