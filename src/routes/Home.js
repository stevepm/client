import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

const Home = () => (
  <Query
    query={gql`
      {
        allUsers {
          id
          email
        }
      }
    `}
  >
    {({ loading, error, data: { allUsers } }) => {
      if (loading) {
        return (
          <p>
            Loading...
          </p>
        );
      }
      if (error) {
        return (
          <p>
            Error :(
          </p>
        );
      }

      return allUsers.map(({ id, email }) => (
        <div key={id}>
          <p>
            {email}
          </p>
        </div>
      ));
    }}
  </Query>
);

export default Home;
