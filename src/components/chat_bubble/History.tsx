import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEventHandler, useRef } from "react";
import ReactTimeAgo from "react-timeago";
import styled, { css } from "styled-components";

export type HistoryItem = {
  text: string;
  isUser: boolean;
  time: Date;
}

type Props = {
  history: HistoryItem[];
  onUserMessage: (message: string) => void;
  onClose: () => void;
}

const Wrap = styled.div`
  background: var(--color-surface);
  width: min(400px, 70vw);
  border-radius: var(--gap);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--gap);
  padding-left: calc(var(--gap) * 2);
  box-shadow: inset 0 -1px 0 0 var(--color-primary);
  h4 {
    margin: 0;
    font-size: var(--font-size-large);
    font-weight: bold;
  }
`;
const CloseIcon = styled.div`
  cursor: pointer;
`;
const HistoryPager = styled.div`
  max-height: min(300px, 50vh);
  overflow: auto;
  padding: var(--gap) calc(var(--gap) * 2);
`;
const BotMessage = css`
  background: var(--color-primary);
  color: var(--color-on-primary);
  margin-right: 15px;
`
const UsserMessage = css`
  background: var(--color-secondary);
  color: var(--color-on-secondary);
  margin-left: 15px;
`;

const Message = styled.div<{ isUser: boolean }>`
  position: relative;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0 25px 0;
  ${({ isUser }) => isUser ? UsserMessage : BotMessage}
`;
const MessageTime = styled.small`
  position: absolute;
  bottom: -18px;
  font-size: var(--font-size-small);
  color: var(--color-on-background);
  opacity: 0.5;
`;
const BotIsTyping = styled.div`
  font-style: italic;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0 1px 0 0 var(--color-primary);
  padding: var(--gap);
  padding-left: calc(var(--gap) * 2);
`;

const History = ({onUserMessage, history, onClose}: Props) => {
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLInputElement>(null);

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const message = userMessage.current?.value;
    if (message) {
      onUserMessage(message);
      userForm.current?.reset()
    }
  }

  return (
    <Wrap>
      <Header>
        <h4>
          Chat with a "100% real human"{" "}
          <abbr title="Disclaimer: Actually, this is a bot that almost feels like a real human (not a smart one)">*</abbr>
        </h4>
        <CloseIcon onClick={() => onClose()}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </CloseIcon>
      </Header>
      <HistoryPager>
        {history.length > 0 && history
          .sort((a, b) => a.time.getTime() - b.time.getTime())
          .map((item, index) => (
            <Message key={index} isUser={item.isUser}>
              {item.text}<br />
              <MessageTime><ReactTimeAgo date={item.time} /></MessageTime>
            </Message>
          ))}
        {history.length == 0 && <BotIsTyping>Is typing...</BotIsTyping>}
      </HistoryPager>

      <Form onSubmit={handleFormSubmit} ref={userForm}>
        <input
          name="message"
          title="Your message"
          placeholder="Type here..."
          ref={userMessage}
        />
        <button type="submit">Send</button>
      </Form>
    </Wrap>
  );
}

export default History;
