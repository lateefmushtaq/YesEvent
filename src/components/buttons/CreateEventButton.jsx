import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import styled from "styled-components";

export const Button = styled(BootstrapButton)`
  background-color: ${(props) => props.backgroundcolor || "#80af81"};
  border: 2px solid ${(props) => props.bordercolor};
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: ${(props) => props.margin};
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0px 8px 0px ${(props) => props.bordercolor};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.coloronhover};
    color: #fff;
    border: 2px solid ${(props) => props.bordercolor};
    font-size: 16px;
    font-weight: 700;
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
  margin,
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
      margin={margin}
    >
      {children}
    </Button>
  );
}

export default MyButton;
