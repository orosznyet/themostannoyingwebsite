import useAudio from "@/hooks/useAudio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import ReactTimeAgo from "react-timeago";
import styled from "styled-components";

const IconWrap = styled.div`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  background: blue;
  border-radius: 50%;
`;
const IconBadge = styled.div`
  position: absolute;
  background: red;
  border: 50%;
`;
const HistoryWrap = styled.div`
  display: none;
  position: absolute;
  bottom: 1rem;
  left: 3rem;
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
const BotIsTyping = styled.div``;
const Wrap = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  &.open ${HistoryWrap} {
    display: block;
  }
`;

type HistoryItem = { text: string; isUser: boolean, time: Date };
const messages = [
  'Come on, let me help you!',
  `I can't hear you! Speak louder!`,
  'Who lives under the sea?',
  'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.',
  `Sorry, I'm going through a tunnel right now. Can you repeat that?`,
  `You must have missed my previous messages. I'm kind of lonely.`,
];
const fallbackMessage = `I's nothing, leave me alone. 😤`;
const initialMessage = () => ({
  text: 'Hello! I am a chat bubble. I am here to help you. 🤓',
  isUser: false,
  time: new Date(),
})

/**
 * This component should start off with an initial message so that we
 * have at least one interaction from the user.
 * Every time the user closes the chat bubble, we should add a new message
 * to the history now with a notification sound.
 */
const ChatBubble = () => {
  const [history, setHistory] = useState([initialMessage()] as HistoryItem[]);
  const [isOpen, setIsOpen] = useState(false);
  const [badgeCounter, setBadgeCounter] = useState(1);
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLInputElement>(null);
  const notificationSfx = useAudio("/assets/sfx/notification_chord1.wav");

  const addHistory = (message: string, isUser: boolean) => {
    setHistory([...history, { text: message, isUser, time: new Date() }]);
  };

  const addRandomBotMessage = () => {
    const pool = messages.filter(message => !history.some(item => item.text === message));
    if (pool.length == 0) {
      pool.push(fallbackMessage);
    }
    const randomMessage = pool[Math.floor(Math.random() * pool.length)];
    addHistory(randomMessage, false);
    if (!isOpen) {
      setBadgeCounter(badgeCounter + 1);
      try {
        notificationSfx.play();
      } catch (e) {
        console.error(e);
      }
    }
  }

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const message = userMessage.current?.value;
    if (message) {
      addHistory(message, true);
      userForm.current?.reset()
    }
  }

  const closeHistory = () => setIsOpen(false);
  const toggleHistory: MouseEventHandler<HTMLDivElement> = () => {
    if (!isOpen) {
      setBadgeCounter(0);
    }
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) { return; }

    const timer = setTimeout(() => addRandomBotMessage(), 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("click", closeHistory)
    return () => {
      document.removeEventListener("click", closeHistory)
    }
  }, [])

  return (
    <Wrap className={isOpen ? 'open' : 'closed'} onClick={(e) => e.stopPropagation()}>
      <IconWrap onClick={toggleHistory}>
        <FontAwesomeIcon icon={["fas", "comment-dots"]} />
        {badgeCounter > 0 && <IconBadge>{badgeCounter}</IconBadge>}
      </IconWrap>
      <HistoryWrap>
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
          <input name="message" ref={userMessage} />
          <button type="submit">Send</button>
        </form>
      </HistoryWrap>
    </Wrap>
  );
}

export default ChatBubble;
