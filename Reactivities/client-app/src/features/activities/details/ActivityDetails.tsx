import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Link, useHistory, useParams } from "react-router-dom";

export default observer(function ActivityDetails() {
  const history = useHistory();
  
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    loadActivity(id);
  });

  if (loadingInitial || !activity) {
    return <LoadingComponent />;
  }

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity?.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button onClick={() => history.goBack()} basic color="red" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
