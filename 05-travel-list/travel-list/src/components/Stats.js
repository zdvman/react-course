export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className='stats'>
        <em>Start adding some items in your packing list 🚀</em>
      </footer>
    );
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const persantage = Math.round((packedItems / numItems) * 100);
  return (
    <footer className='stats'>
      {persantage === 100 ? (
        <em>You got everything! Ready to go ✈️</em>
      ) : (
        <em>
          You have {numItems} items on your list, and you are already packed{' '}
          {packedItems} ({persantage}%)
        </em>
      )}
    </footer>
  );
}
