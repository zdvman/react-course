import ReactCountryFlag from 'react-country-flag';
import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  const { emoji } = country;
  return (
    <li className={styles.countryItem}>
      {/* <span>{country.emoji}</span> */}
      <ReactCountryFlag
        countryCode={emoji}
        svg
        className={styles.emoji}
        aria-label={country}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
