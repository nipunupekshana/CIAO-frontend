import React, { Component, Fragment } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() =>
  import("./containers/DefaultLayout/DefaultLayout")
);

// Pages
const Login = React.lazy(() => import("./views/Login/Login"));
const Register = React.lazy(() => import("./views/Register/Register"));
const Page404 = React.lazy(() => import("./views/Page404/Page404"));
const Page500 = React.lazy(() => import("./views/Page500/Page500"));

class App extends Component {
  componentDidMount() {
    this.props.LOADUSER();
  }

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            {!this.props.isAuthenicated ? (
              <Fragment>
                <Route
                  path="*"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Register {...props} />}
                />
                <Route
                  exact
                  path="/404"
                  name="Page 404"
                  render={(props) => <Page404 {...props} />}
                />
                <Route
                  exact
                  path="/500"
                  name="Page 500"
                  render={(props) => <Page500 {...props} />}
                />
              </Fragment>
            ) : (
              <Route
                name="Home"
                render={(props) => <DefaultLayout {...props} />}
              />
            )}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
  isLoading: state.auth.isLoading,
  error: state.error,
  token: state.auth.token
});

const mapDispachToProps = (dispach) => {
  return {
    //LOGIN: (newUser) => dispach(login(newUser)),
    LOADUSER: () => dispach(loadUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
