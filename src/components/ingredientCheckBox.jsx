function Checkbox({ label, checked, id, onChange }) {
  return (
    <div>
      <input type="checkbox" id={ id } checked={ checked } onChange={ onChange } />
      <label htmlFor={ id }>{label}</label>
    </div>
  );
}
export default Checkbox;
