import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';

function CitiList({ cities, isLoading }) {
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
  console.log('Step 1: cities array', cities);

  // Step 2: Map each city to a [country, {country, emoji}] pair
  const pairs = cities.map((city) => [
    city.country,
    { country: city.country, emoji: city.emoji },
  ]);
  console.log('Step 2: pairs', pairs);

  // Step 3: Create a Map from the pairs (unique by country)
  const countryMap = new Map(pairs);
  console.log('Step 3: countryMap', countryMap);

  // Step 4: Get the values from the Map (unique country-emoji objects)
  const valuesIterable = countryMap.values();
  console.log('Step 4: valuesIterable', Array.from(valuesIterable)); // Convert to array for display

  // Step 5: Convert the iterable to an array
  const uniqueCountries = Array.from(countryMap.values());
  console.log('Step 5: uniqueCountries', uniqueCountries);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CitiList;
