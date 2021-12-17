import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import R from "ramda";

import { attemptToGetTestLists } from "_thunks/tests";

import Box from "react-bulma-companion/lib/Box";
import Block from "react-bulma-companion/lib/Block";
import Image from "react-bulma-companion/lib/Image";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptToGetTestLists())
      .catch(R.identity())
      .then(() => {});
  }, []);

  return (
    <div className="welcome-page page">
      <Box>
        <Link to="/test">
          <Block>This text is above the image</Block>
          <Block>
            <Image src="images/app_logo_light.png" />
          </Block>
          <Block>
            And this is below and it is where it should be even before the image
            is loaded
          </Block>
        </Link>
      </Box>
    </div>
  );
}
