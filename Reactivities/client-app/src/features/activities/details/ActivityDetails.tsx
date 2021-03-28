import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponet from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

interface Props {}

export default function ActivityDetails(_: Props) {
  const { activityStore } = useStore();
  const { selectedActivity: activity } = activityStore;
  console.log("xxx");
  if (!activity) {
    return <LoadingComponet />;
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
            onClick={() => {
              activityStore.openForm(activity.id);
            }}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => {
              activityStore.cancelSelectedActivity();
            }}
            basic
            color="red"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
