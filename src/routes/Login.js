import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await
      this.props.mutate({
        variables: { email, password }
      });
    console.log(response);
    const { ok, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  onChange = e => {
    const { name, value } = e.target;

    this[name] = value;
  };

  render() {
    const { email, password } = this;

    return (
      <Container text>
        <Header as="h2">
          Login
        </Header>

        <Input
          name="email"
          onChange={this.onChange}
          placeholer="Email"
          value={email}
          fluid
        />
        <Input
          name="password"
          onChange={this.onChange}
          placeholer="Password"
          value={password}
          type="password"
          fluid
        />
        <Button onClick={this.onSubmit}>
          Submit
        </Button>
      </Container>
    );
  }
};
const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
