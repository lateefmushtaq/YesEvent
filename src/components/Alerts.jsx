import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import { useEffect, useState } from "react";
const StyledAlert = styled(Alert)`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyAlert({ Message, icon, variant, timeout = 2000 }) {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, timeout);
    }
  }, [isVisible, timeout]);
  if (!isVisible) {
    return null;
  }
  return (
    <StyledAlert variant={variant}>
      {icon}
      {Message}
    </StyledAlert>
  );
}

export default MyAlert;
