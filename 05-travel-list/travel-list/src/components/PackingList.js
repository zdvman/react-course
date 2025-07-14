import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('input');

  const sortedItems = [...items];

  switch (sortBy) {
    case 'description':
      sortedItems.sort((a, b) => a.description.localeCompare(b.description));
      break;
    case 'packed':
      sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
    default:
      break;
  }

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className='actions'>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
