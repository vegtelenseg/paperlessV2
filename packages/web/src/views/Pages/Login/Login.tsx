import React from "react";
// import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../mutations/UserLoginMutation';
import { Environment } from 'react-relay';

const Schema = Yup.object().shape({
  email: Yup.string().required('Username is a required field'),
  password: Yup.string().required('Password is a required field'),
});

interface Props {
  environment: Environment
}

interface Credentials {
  email: string,
  password: string
}
class Login extends React.Component<Props> {

  handleUserLogin = async(credentials: Credentials) => {
    const data = await userLogin(this.props.environment, {input: credentials});
    console.log(this.props)
    setTimeout(() => {
    console.log('output ', data)   
    }, 5000);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>


                  <Formik
                      initialValues={{ email: '', password: '' }}
                      validationSchema={Schema}
                      onSubmit={async (values, { setSubmitting }) => {
                        this.handleUserLogin(values)
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Username"
                                autoComplete="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                            </InputGroup>
                            {errors.email && touched.email && errors.email}
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                            </InputGroup>
                            {errors.password && touched.password && errors.password}
                            <Row>
                              <Col xs="6">
                                <Button type="submit" color="primary" className="px-4">
                                  Login
                                </Button>
                              </Col>
                              <Col xs="6" className="text-right">
                                <Button color="link" className="px-0">
                                  Forgot password?
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                      )}
                    </Formik>
    
                    
                  </CardBody>
                </Card>
                {/* <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
