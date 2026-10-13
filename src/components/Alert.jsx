const Alert = ({ type, text }) => {
  return (
    <p className={`notice ${type === "danger" ? "danger" : "success"}`} role="status">
      {text}
    </p>
  );
};

export default Alert;
