import Alert from "react-bootstrap/Alert";
function MyAlert({ Message }) {
  return (
    <>
      <Alert variant="danger">{Message}</Alert>
    </>
  );
}
export default MyAlert;
