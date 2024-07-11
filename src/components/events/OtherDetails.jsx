import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../contextProvider/AuthProvider";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../buttons/CreateEventButton";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  linkName: yup.string().required(),
});

function OtherDetails() {
  const navigate = useNavigate();
  const { setEventData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    console.log(data);
    navigate("/dashboard");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Other Deatils</h1>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Links & Social Media</Form.Label>
          <Form.Select defaultValue="Choose..." id="link" {...register("link")}>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Github</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Select Topic</Form.Label>
          <Form.Control type="text" id="linkName" {...register("linkName")} />
          {errors.linkName && <p>{errors.linkName.message}</p>}
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Next
      </Button>
      <Button variant="danger" type="reset">
        Cancel
      </Button>
    </Form>
  );
}

export default OtherDetails;
