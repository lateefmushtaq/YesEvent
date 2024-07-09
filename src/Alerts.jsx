import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const StyledAlert = styled(Alert)`
  background-color: #ee4e4e;
  border-color: #f5c6cb;
  color: #fff;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
`;

function MyAlert({ Message, icon }) {
  return (
    <>
      <StyledAlert variant="danger">
        {" "}
        {icon}
        {Message}
      </StyledAlert>
    </>
  );
}

export default MyAlert;
