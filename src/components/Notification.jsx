const Notification = ({ errorMessage, severity }) => {
  return (
    <div
      style={{
        border: "2px solid",
        borderColor: severity === "success" ? "green" : "red",
        background:"lightGray"
      }}
    >
      <p>{errorMessage}</p>
    </div>
  );
};

export default Notification;
