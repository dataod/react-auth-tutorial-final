import "./styles/styles.scss";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Auth from "./pages/auth/Auth";
import Account from "./pages/account/Account";
import Header from "./components/header/Header";
import EmailVerification from "./pages/account/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PasswordReset from "./pages/auth/PasswordReset";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route
          path="/email-verification/:token"
          component={EmailVerification}
        />
        <Route path="/password-change/:token" component={PasswordReset} />

        {/* Protected routes */}
        <ProtectedRoute path="/account" exact component={Account} />

        <Route path="*" component={Error} />
      </Switch>
    </>
  );
}

export default App;
