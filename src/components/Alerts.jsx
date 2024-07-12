import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
const StyledAlert = styled(Alert)`
  background-color: ${(props) => props.backgroundcolor};
  border: 2px solid ${(props) => props.border};
  color: ${(props) => props.color};
  padding: 10px;
  margin: ${(props) => props.margin};
  text-align: center;
  border-radius: ${(props) => props.radius};
  margin: ${(props) => props.margin};
`;

function MyAlert({
  Message,
  icon,
  backgroundcolor,
  color,
  border,
  margin,
  radius,
}) {
  return (
    <>
      <StyledAlert
        backgroundcolor={backgroundcolor}
        color={color}
        border={border}
        margin={margin}
        radius={radius}
      >
        {icon}
        {Message}
      </StyledAlert>
    </>
  );
}

export default MyAlert;
