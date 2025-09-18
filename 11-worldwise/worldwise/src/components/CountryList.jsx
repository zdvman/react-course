import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first country by clicking on the city on the map' />
    );

  // const uniqueCountries = Array.from(
  //   new Map(
  //     cities.map((city) => [
  //       city.country,
  //       { country: city.country, emoji: city.emoji },
  //     ])
  //   ).values()
  // );

  // Step 1: Original array

  // Step 2: Map each city to a [country, {country, emoji}] pair
  // const pairs = cities.map((city) => [
  //   city.country,
  //   { country: city.country, emoji: city.emoji },
  // ]);

  // // Step 3: Create a Map from the pairs (unique by country)
  // const countryMap = new Map(pairs);

  // // Step 4: Get the values from the Map (unique country-emoji objects)
  // const valuesIterable = countryMap.values();

  // // Step 5: Convert the iterable to an array
  // const uniqueCountries = Array.from(countryMap.values());

  const uniqueCountries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CityList;
