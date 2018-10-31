import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if ((!this.props.isAuth && !this.props.jwtToken)|| this.props.name !== 'admin') {
        this.props.history.push('/new');
      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token,
      name:state.auth.name
        }
  }

  return connect(mapStateToProps)(MixedComponent);
};


