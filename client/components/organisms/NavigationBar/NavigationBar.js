import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bulma-companion/lib/Navbar";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";

export default function NavigationBarComponent() {
  return (
    <Navbar fixed="top" shadow>
      <Container>
        <Navbar.Brand>
          <Navbar.Item to="/" aria-label="main navigation" component={Link}>
            <Title className="logo" size="3">
              CheatA-Key
            </Title>
          </Navbar.Item>
          <div className="navbar-brand-right">
            <Navbar.Item
              className="is-hidden-desktop"
              to="/admin"
              component={Link}
            >
              <Title size="6">Admin</Title>
            </Navbar.Item>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
