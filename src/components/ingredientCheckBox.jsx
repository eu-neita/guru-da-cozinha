function Checkbox({ label, checked, id, onChange, index }) {
  return (
    <div>
      <input type="checkbox" id={ id } checked={ checked } onChange={ onChange } />
      <label data-testid={ `${index}-ingredient-step` } htmlFor={ id }>{label}</label>
    </div>
  );
}
export default Checkbox;
