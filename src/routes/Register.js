import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Container, Header, Input, Button } from 'semantic-ui-react';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = () => {
    this.props.mutate({
      variables: this.state
    });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as="h2">
          Register
        </Header>

        <Input name="username" onChange={this.onChange} placeholer="Username" value={username} fluid />
        <Input name="email" onChange={this.onChange} placeholer="Email" value={email} fluid />
        <Input name="password" onChange={this.onChange} placeholer="Password" value={password} type="password"
               fluid />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}


const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);