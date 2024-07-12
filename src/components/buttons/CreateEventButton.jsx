import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import styled from "styled-components";

export const Button = styled(BootstrapButton)`
  background-color: ${(props) => props.backgroundcolor || "#80af81"};
  border: 2px solid ${(props) => props.color};
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${(props) => props.coloronhover};
    color: ${(props) => props.backgroundcolor};
    border: 2px solid ${(props) => props.color};
  }
  &:active,
  &:focus {
    background-color: ${(props) => props.coloronhover || "#508d4e"} !important;
    border: none !important;
  }
`;

function MyButton({
  children,
  handleclick,
  backgroundcolor,
  bordercolor,
  coloronhover,
  color,
  width,
  type = "button",
}) {
  return (
    <Button
      bordercolor={bordercolor}
      color={color}
      width={width}
      coloronhover={coloronhover}
      backgroundcolor={backgroundcolor}
      onClick={handleclick}
      type={type}
    >
      {children}
    </Button>
  );
}

export default MyButton;
