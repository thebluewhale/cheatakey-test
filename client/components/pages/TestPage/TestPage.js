import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import Container from "react-bulma-companion/lib/Container";
import Progress from "react-bulma-companion/lib/Progress";
import Field from "react-bulma-companion/lib/Field";
import Label from "react-bulma-companion/lib/Label";
import Box from "react-bulma-companion/lib/Box";
import Block from "react-bulma-companion/lib/Block";
import Notification from "react-bulma-companion/lib/Notification";
import Control from "react-bulma-companion/lib/Control";
import Textarea from "react-bulma-companion/lib/Textarea";
import Button from "react-bulma-companion/lib/Button";

export default function TestPage() {
  const MAX_PROGRESS = 2;
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.tests.lists);
  const [submittedText, setSubmittedText] = useState("");
  const [presentedText, setPresentedText] = useState("");
  const [progress, setProgress] = useState(0);

  const updateText = (e) => setSubmittedText(e.target.value);

  const onSubmitText = () => {
    setProgress(progress + 1);
  };

  useEffect(() => {
    if (progress == MAX_PROGRESS) {
      dispatch(push("/terminate"));
    }
    setPresentedText(lists[progress]);
  }, [progress]);

  return (
    <div className="test-page page">
      <Container>
        <Box>
          <Block>
            <Progress max={MAX_PROGRESS} value={progress} />
          </Block>
          <Field>
            <Label>Presented Sentence</Label>
            <React.Fragment key=".0">
              <Block>
                <Notification>{presentedText}</Notification>
              </Block>
            </React.Fragment>
          </Field>
          <Field>
            <Label>Type here</Label>
            <Control>
              <Textarea
                placeholder="type here"
                value={submittedText}
                onChange={updateText}
              ></Textarea>
            </Control>
          </Field>
          <Button color="primary" onClick={onSubmitText}>
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
}
