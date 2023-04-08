import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',     // a blue botton class
  inverted: 'inverted',         // a white button with black hover
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button