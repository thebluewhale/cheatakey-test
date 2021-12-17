import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bulma-companion/lib/Container";
import Section from "react-bulma-companion/lib/Section";
import Title from "react-bulma-companion/lib/Title";

export default function LostPage() {
  return (
    <div className="terminate-page page">
      <Section>
        <Container>
          <Title size="1">
            <Link to="/">Thanks you.</Link>
          </Title>
          <Title size="1">
            <Link to="/">Click to go first page.</Link>
          </Title>
        </Container>
      </Section>
    </div>
  );
}
