import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container style={{marginTop: "5em"}}>
      <h1>Homepage</h1>
      <h3>Go to <Link to="/activities">Activites</Link></h3>
    </Container>
  );
}
