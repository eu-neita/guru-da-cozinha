import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkImg from '../images/drinkIcon.svg';
import mealImg from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const myStyle = {
    position: 'fixed',
    bottom: '0',
  };
  return (
    <div data-testid="footer" style={ myStyle }>
      <button onClick={ () => history.push('/drinks') }>
        <img
          src={ drinkImg }
          alt="drinks icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ () => history.push('/meals') }>
        <img
          src={ mealImg }
          alt="meals icon"
          data-testid="meals-bottom-btn"
        />
      </button>
    </div>
  );
}

export default Footer;
