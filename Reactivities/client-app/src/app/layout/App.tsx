import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  // States
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => {
        console.log("Axios response");
        setActivities(res.data);
      });
  }, []);

  function handleSelectedActivity(id: string) {
    console.log("select");
    setSelectedActivity(activities.find((activity) => activity.id === id));
    console.log(selectedActivity);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          activity,
          ...activities.filter(
            (currentActivity) => currentActivity.id !== activity.id
          ),
        ])
      : setActivities([{ ...activity, id: uuid() }, ...activities]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(currentActivity => currentActivity.id !== id)])
  }

  return (
    <Fragment>
      {/* or can shorthand <>...</> */}
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "5em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
