import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import { logout } from "../../actions/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import _navs from "../../_nav";
// routes config
import routes from "../../routes";
import { connect } from "react-redux";

const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  state = {
    isAuthenicated: true
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push("/login");
    this.props.LOGOUT();
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={_navs}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <route.component {...props} {...route.props} />
                        )}
                      />
                    ) : null;
                    //  (
                    //   <Redirect from="*" to="/dashboard" />
                    // );
                  })}

                  <Redirect from="*" to="/dashboard" />
                </Switch>
              </Suspense>
              <ToastContainer autoClose={3000} position="bottom-center" />
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    LOGOUT: () => dispach(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DefaultLayout);
