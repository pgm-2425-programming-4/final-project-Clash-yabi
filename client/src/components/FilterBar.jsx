export default function FilterBar() {
  return (
    <div className="filter-bar">
      <select className="filter-bar__select">
        <option>Back-end</option>
        <option>Front-end</option>
        <option>Infra</option>
        <option>Documentation</option>
      </select>
      <input
        type="text"
        placeholder="Search by description"
        className="filter-bar__input"
      />
    </div>
  );
}
