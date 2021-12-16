import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import R from "ramda";

import { attemptToGetTestLists } from "_thunks/tests";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptToGetTestLists())
      .catch(R.identity())
      .then(() => {});
  }, []);

  return (
    <div className="welcome-page page">
      <Section>
        <Container>
          <Title size="1">
            <Link to="/test">Click to test</Link>
          </Title>
        </Container>
      </Section>
    </div>
  );
}
