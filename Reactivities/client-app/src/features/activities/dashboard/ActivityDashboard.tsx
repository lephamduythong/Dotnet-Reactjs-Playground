import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      activityStore.loadActivities();
    }
  }, [activityStore, activityRegistry.size]);

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activiy filters</h2>
      </Grid.Column>
    </Grid>
  );
});
