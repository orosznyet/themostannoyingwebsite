import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectReviewCompleted, setReviewCompleted } from "@/redux/stores/consent";
import styled from "styled-components";

const Wrap = styled.div`
  position: sticky;
  bottom: 0;
`;

const CookieBar = () => {
  const dispatch = useAppDispatch()
  const completed = useAppSelector(selectReviewCompleted)

  const handleCookieBar = () => {
    dispatch(setReviewCompleted(true))
  };

  return (
    <>
      {!completed && (
        <Wrap>
          <p>
            This website uses cookies to ensure you get the best experience on our website.
          </p>
          <button onClick={handleCookieBar}>Got it!</button>
        </Wrap>
      )}
    </>
  );
}

export default CookieBar;
