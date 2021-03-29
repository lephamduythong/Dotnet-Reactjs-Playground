import React, { Fragment } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route } from "react-router";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/homepage" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route exact path="/activities/:id" component={ActivityDetails} />
        <Route path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
