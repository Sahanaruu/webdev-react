export default function RecentSearches({ items, onClick, clear }) {
  if (!items.length) return null;

  return (
    <div className="recent">
      <h3>Recent</h3>
      {items.map((city,i)=>(
        <button key={i} onClick={()=>onClick(city)}>{city}</button>
      ))}
      <button className="clear" onClick={clear}>Clear All</button>
    </div>
  );
}