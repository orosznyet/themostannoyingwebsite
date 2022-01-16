import useAudio from "@/hooks/useAudio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import History from "@/components/chat_bubble/History";
import { useAppSelector } from "@/redux/hooks";
import { selectHasInteracted } from "@/redux/stores/runtime";
import { cssVars } from "@/styles/theme";
import { selectEnableSound } from "@/redux/stores/preference";

const zIndexBase = 20;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  z-index: ${zIndexBase};
  cursor: pointer;
  background: ${cssVars.color.primary};
  color: ${cssVars.color.onPrimary};
  font-size: 2rem;
  border-radius: 50%;
`;
const IconBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: calc(${cssVars.fontSize.small} * 2);
  padding: 5px;
  z-index: ${zIndexBase + 1};
  font-size: ${cssVars.fontSize.small};
  text-align: center;
  background: ${cssVars.color.error};
  color: ${cssVars.color.onError};
  border-radius: 50%;
`;
const HistoryWrap = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 3rem;
  visibility: hidden;
  z-index: ${zIndexBase + 2};
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s;
`;
const Wrap = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: ${zIndexBase};
  &.open ${HistoryWrap} {
    visibility: visible;
    opacity: 1;
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
const ActionButton = () => {
  const enableSound = useAppSelector(selectEnableSound);
  const hasInteracted = useAppSelector(selectHasInteracted);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [badgeCounter, setBadgeCounter] = useState(1);
  const notificationSfx = useAudio("/assets/sfx/notification_chord1.wav");

  const preventClose: MouseEventHandler = (e) => e.stopPropagation();
  const addHistory = (message: string, isUser: boolean) => {
    setHistory([...history, { text: message, isUser, time: new Date() }]);
  };

  const playSound = () => {
    if (!enableSound || !notificationSfx) { return; }
    try {
      notificationSfx.play();
    } catch (e) {
      console.error(e);
    }
  }

  const addRandomBotMessage = () => {
    const pool = messages.filter(message => !history.some(item => item.text === message));
    if (pool.length == 0) {
      pool.push(fallbackMessage);
    }
    const randomMessage = pool[Math.floor(Math.random() * pool.length)];
    addHistory(randomMessage, false);
    if (!isOpen) {
      setBadgeCounter(badgeCounter + 1);
      playSound();
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
    if (isOpen || !hasInteracted) { return; }

    const timer = setTimeout(() => addRandomBotMessage(), 3000);
    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  useEffect(() => {
    if (!history.length) {
      setHistory([initialMessage()]);
    }

    document.addEventListener("click", closeHistory)
    return () => {
      document.removeEventListener("click", closeHistory)
    }
  }, [])

  return (
    <Wrap className={isOpen ? 'open' : 'closed'} onClick={preventClose}>
      <IconWrap onClick={toggleHistory}>
        <FontAwesomeIcon icon={["fas", "comment-dots"]} />
        {badgeCounter > 0 && <IconBadge>{badgeCounter}</IconBadge>}
      </IconWrap>
      <HistoryWrap>
        <History
          history={history}
          onUserMessage={(message) => addHistory(message, true)}
          onClose={closeHistory}
          />
      </HistoryWrap>
    </Wrap>
  );
}

export default ActionButton;
