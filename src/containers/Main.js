import React, { PropTypes } from 'react';
import IndexPanel from '../components/IndexPanel';
import CodeSnippet from '../components/CodeSnippet';
import ExampleWell from '../components/ExampleWell';
import RequestTestButton from '../components/RequestTestButton';
import { updateDemoTheme, updateDemoEndpoint } from '../actions/demo-ui';
import { PageHeader, OverlayTrigger, Tooltip, Row, ButtonGroup, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as BSTheme from 'redux-auth/bootstrap-theme';
import * as DefaultTheme from 'redux-auth/default-theme';
import * as MUITheme from 'redux-auth/material-ui-theme';
import Select from 'react-select';

if (!global.__SERVER__ && !global.__TEST__) {
  require('../styles/main.scss');
}

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pageEndpoint: PropTypes.string,
    theme: PropTypes.string,
    currentUserUid: PropTypes.string,
    currentUserProvider: PropTypes.string,
    currentUserEndpoint: PropTypes.string,
  };

  updateTheme({ value }) {
    this.props.dispatch(updateDemoTheme(value));
  }

  updateEndpoint({ value }) {
    this.props.dispatch(updateDemoEndpoint(value));
  }

  render() {
    let Theme;
    let themePath;
    const endpointAttr = (this.props.pageEndpoint === 'default')
      ? ''
      : 'endpoint="evilUser"';

    switch (this.props.theme) {
      case 'bootstrap':
        Theme = BSTheme;
        themePath = '/bootstrap-theme';
        break;
      case 'default-theme':
        Theme = DefaultTheme;
        themePath = '/default-theme';
        break;
      default:
        Theme = MUITheme;
        themePath = '/material-ui-theme';
        break;
    }

    return (
      <div>
        <Row>
          <IndexPanel header="Current User">
            <label>current user provider</label>
            <p>{this.props.currentUserUid}</p>

            <label>current user uid</label>
            <p>{this.props.currentUserProvider}</p>
          </IndexPanel>

          <IndexPanel header="Email Sign In">
            <ExampleWell>
              <Theme.EmailSignInForm
                next={() => browserHistory.push('/account')}
                endpoint={this.props.pageEndpoint}
              />
            </ExampleWell>
          </IndexPanel>

          <IndexPanel header="Sign Out">
            <ExampleWell>
              <Theme.SignOutButton endpoint={this.props.pageEndpoint} />
            </ExampleWell>
          </IndexPanel>

          <IndexPanel header="Email Sign Up">
            <ExampleWell>
              <Theme.EmailSignUpForm endpoint={this.props.pageEndpoint} />
            </ExampleWell>
          </IndexPanel>

          <IndexPanel header="OAuth Sign In">
            <ExampleWell>
              <ButtonGroup>
                <Theme.OAuthSignInButton
                  provider="facebook"
                  endpoint={this.props.pageEndpoint}
                  next={() => browserHistory.push('/account')}
                  secondary
                  bsStyle="primary"
                >
                  Facebook
                </Theme.OAuthSignInButton>
                <Theme.OAuthSignInButton
                  provider="google"
                  endpoint={this.props.pageEndpoint}
                  next={() => browserHistory.push('/account')}
                  primary
                  bsStyle="warning"
                >
                  Google
                </Theme.OAuthSignInButton>
              </ButtonGroup>
            </ExampleWell>
          </IndexPanel>
        </Row>
      </div>
    );
  }
}

export default connect(({ auth, demoUi }) => ({
  currentUserUid: auth.getIn(['user', 'attributes', 'provider']) || 'none',
  currentUserProvider: auth.getIn(['user', 'attributes', 'uid']) || 'none',
  currentUserEndpoint: auth.getIn(['user', 'endpointKey']) || 'none',
  theme: demoUi.get('theme'),
  pageEndpoint: demoUi.get('endpoint'),
}))(Main);
