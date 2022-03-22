import classes from './Card.module.css';

const Card = (props) => {
  return (
    <section id="cart"
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
