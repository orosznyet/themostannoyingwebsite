import { cssRule, cssVars } from "@/components/master/Theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDarkMode } from "@/redux/stores/appearance";
import {
  setEnableAnalytics,
  setEnableCookies,
  setAdultFilter,
  setEnableFlashing,
} from "@/redux/stores/consent";
import ReactTimeAgo from "react-timeago";
import styled from "styled-components";

const Blocks = styled.div`
  display: grid;
  ${cssRule.mdUp} {
    grid-template-columns: 1fr 1fr;
  }
`;
const Block = styled.div`
  border: 1px solid ${cssVars.color.secondary};
`;

export default function PrivacyPolicy() {
  const dispatch = useAppDispatch()
  const appearance = useAppSelector(state => state.appearance);
  const consent = useAppSelector((state) => state.consent);
  const runtime = useAppSelector((state) => state.runtime);

  return (
    <main>
      <h1>Settings</h1>

      <Blocks>
        <Block>
          <h2>Appearance</h2>
          <p>
            <label>
              Dark mode
              <input
                type="checkbox"
                name="dark_mode"
                checked={appearance.isDarkMode}
                onChange={() => dispatch(setDarkMode(!appearance.isDarkMode))}
              />
            </label>
          </p>
        </Block>

        <Block>
          <h2>Consent and content</h2>
          <p>
            <label>
              Enabel cookies
              <input
                type="checkbox"
                name="enable_cookies"
                checked={consent.enableCookies}
                onChange={() => dispatch(setEnableCookies(!consent.enableCookies))}
              />
            </label>
          </p>
          <p>
            <label>
              Enable analytics
              <input
                type="checkbox"
                name="enable_analytics"
                checked={consent.enableAnalytics}
                onChange={() => dispatch(setEnableAnalytics(!consent.enableAnalytics))}
              />
            </label>
          </p>
          <p>
            <label>
              Filter adult contents
              <input
                type="checkbox"
                name="adult_filter"
                checked={consent.adultFilter}
                onChange={() => dispatch(setAdultFilter(!consent.adultFilter))}
              />
            </label>
          </p>
          <p>
            <label>
              Flashing contents
              <input
                type="checkbox"
                name="enable_flashing"
                checked={consent.enableFlashing}
                onChange={() => dispatch(setEnableFlashing(!consent.enableFlashing))}
              />
            </label>
          </p>
        </Block>

        <Block>
          <h2>About this experience</h2>
          <small>These values reset every single visit.</small>
          <p>
            Started at <ReactTimeAgo date={runtime.startTime} />
          </p>
          <p>
            Elapsed seconds: <span>{runtime.inFocusSeconds}</span>
          </p>
          <p>
            Had first interaction: <span>{runtime.hasInteracted? 'Yes': 'No'}</span>
          </p>
        </Block>
      </Blocks>
    </main>
  );
}
