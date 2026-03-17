import '../styles/Button.css';

function Button({ text, children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children ? children : text}
    </button>
  );
}

export default Button;
