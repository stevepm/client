import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    this.setState({
      emailError: '',
      usernameError: '',
      passwordError: '',
    });

    const { username, email, password } = this.state;
    const res = await this.props.mutate({
      variables: { username, email, password }
    });

    const { ok, errors } = res.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const errorsObj = {};
      errors.forEach(({ path, message }) =>
        errorsObj[`${path}Error`] = message);

      this.setState(errorsObj)
    }
  };

  render() {
    const {
      username,
      usernameError,
      email,
      emailError,
      password,
      passwordError,
    } = this.state;

    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">
          Register
        </Header>

        <Input
          error={!!usernameError}
          name="username"
          onChange={this.onChange}
          placeholer="Username"
          value={username}
          fluid />
        <Input
          error={!!emailError}
          name="email"
          onChange={this.onChange}
          placeholer="Email"
          value={email}
          fluid />
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          placeholer="Password"
          value={password}
          type="password"
          fluid />
        <Button onClick={this.onSubmit}>Submit</Button>
        {errorList.length > 0
          ? <Message
            error
            header="There were some errors with your submission"
            list={errorList}
          />
          : null}
      </Container>
    );
  }
}


const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);