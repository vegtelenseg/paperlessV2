import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Environment } from "react-relay";

const Schema = Yup.object().shape({
  email: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field")
});

interface Props {
  environment: Environment;
}

interface Credentials {
  email: string;
  password: string;
}

class Register extends React.Component<Props> {
  handleUserRegistration = async (credentials: Credentials) => {
    // const data = await userLogin(this.props.environment, {input: credentials});
    console.log(this.props);
    setTimeout(() => {
      console.log("output ", credentials);
    }, 5000);
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      repeatPassword: ""
                    }}
                    validationSchema={Schema}
                    onSubmit={async (values, { setSubmitting }) => {
                      this.handleUserRegistration(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                      /* and other goodies */
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <p className="text-muted">Create your account</p>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                        </InputGroup>
                        {errors.email && touched.email && errors.email}

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                        </InputGroup>
                        {errors.password && touched.password && errors.password}

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Repeat password"
                            name="repeatPassword"
                            autoComplete="new-password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repeatPassword}
                          />
                        </InputGroup>
                        {errors.password && touched.password && errors.password}

                        <Button type="submit" color="success" block>
                          Create Account
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
