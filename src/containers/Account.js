import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SignOutButton } from 'redux-auth/bootstrap-theme';
import { browserHistory } from 'react-router';
import { Row } from 'react-bootstrap';
import IndexPanel from '../components/IndexPanel';

class Account extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Account page</PageHeader>
        <p>This page should only visible to authenticated users.</p>
        <SignOutButton next={() => browserHistory.push('/')} />

        <Row>
          <IndexPanel header="Current User">
            <label>current user provider</label>
            <p>{ this.props.currentUserUid }</p>

            <label>current user uid</label>
            <p>{this.props.currentUserProvider}</p>
          </IndexPanel>

      </Row>

      </div>

    );
  }
}

export default connect(({ auth  }) => ({
  currentUserUid: auth.getIn(['user', 'attributes', 'provider']) || 'none',
  currentUserProvider: auth.getIn(['user', 'attributes', 'uid']) || 'none',
  currentUserEndpoint: auth.getIn(['user', 'endpointKey']) || 'none',

}))(Account);
