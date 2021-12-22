import { FormEventHandler, useRef } from "react";
import ReactTimeAgo from "react-timeago";
import styled from "styled-components";

export type HistoryItem = {
  text: string;
  isUser: boolean;
  time: Date;
}

type Props = {
  history: HistoryItem[];
  onUserMessage: (message: string) => void;
}

const Wrap = styled.div`
  background: #ccc;
  padding: var(--gap);
  width: min(400px, 70vw);
`;
const HistoryPager = styled.div`
  max-height: min(300px, 50vh);
  overflow: auto;
`;
const Message = styled.div<{ isUser: boolean }>`
  background: ${({ isUser }) => (isUser ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 100%)")};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  ${({ isUser }) => isUser && "margin-left: 1rem"};
  ${({ isUser }) => !isUser && "margin-right: 1rem"};
`;
const BotIsTyping = styled.div`
  font-style: italic;
`;

const History = ({onUserMessage, history}: Props) => {
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
      <HistoryPager>
        {history.length > 0 && history
          .sort((a, b) => a.time.getTime() - b.time.getTime())
          .map((item, index) => (
            <Message key={index} isUser={item.isUser}>
              {item.text}<br />
              <small><ReactTimeAgo date={item.time} /></small>
            </Message>
          ))}
        {history.length == 0 && <BotIsTyping>Is typing...</BotIsTyping>}
      </HistoryPager>

      <form onSubmit={handleFormSubmit} ref={userForm}>
        <label>
          Your message
          <input name="message" ref={userMessage} />
        </label>
        <button type="submit">Send</button>
      </form>
    </Wrap>
  );
}

export default History;
