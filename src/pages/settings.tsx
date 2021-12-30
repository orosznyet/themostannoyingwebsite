import { cssRule, cssVars } from "@/components/master/Theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setDarkMode,
  setEnableFlashing,
  setEnableSound,
  setAdultFilter,
} from "@/redux/stores/preference";
import {
  setAllowLocation,
  setAllowNotification,
  setAllowAnalytics,
  setAllowCookies,
} from "@/redux/stores/consent";
import ReactTimeAgo from "react-timeago";
import styled from "styled-components";
import { ChangeEventHandler } from "react";
import { setContentPaywall, setExitPrompt, setMockChat, setWheelOfFortune } from "@/redux/stores/experience";

const Blocks = styled.div`
  display: grid;
  ${cssRule.mdUp} {
    grid-template-columns: 1fr 1fr;
  }
`;
const Block = styled.div`
  border: 1px solid ${cssVars.color.secondary};
`;

type ToggableRowProps = {
  label: string,
  name: string,
  checked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>
}
const ToggableRow = ({label, name, checked, onChange} : ToggableRowProps) => {
  return <p>
    <label>
      {label}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </label>
  </p>
}

export default function PrivacyPolicy() {
  const dispatch = useAppDispatch()
  const preference = useAppSelector(state => state.preference);
  const experience = useAppSelector(state => state.experience);
  const consent = useAppSelector((state) => state.consent);
  const runtime = useAppSelector((state) => state.runtime);

  return (
    <main>
      <h1>Settings</h1>

      <Blocks>
        <Block>
          <h2>Preferences</h2>
          <ToggableRow
            label="Dark mode"
            name="dark_mode"
            checked={preference.isDarkMode}
            onChange={() => dispatch(setDarkMode(!preference.isDarkMode))}
            />
          <ToggableRow
            label="Flashing contents"
            name="enable_flashing"
            checked={preference.enableFlashing}
            onChange={() => dispatch(setEnableFlashing(!preference.enableFlashing))}
            />
          <ToggableRow
            label="Sound"
            name="enable_sound"
            checked={preference.enableSound}
            onChange={() => dispatch(setEnableSound(!preference.enableSound))}
            />
          <ToggableRow
            label="Filter adult contents"
            name="enable_flashing"
            checked={preference.adultFilter}
            onChange={() => dispatch(setAdultFilter(!preference.adultFilter))}
            />
        </Block>

        <Block>
          <h2>Consent</h2>
          <ToggableRow
            label="Allow cookies"
            name="allow_cookies"
            checked={consent.allowCookies}
            onChange={() => dispatch(setAllowCookies(!consent.allowCookies))}
            />
          <ToggableRow
            label="Allow analytics"
            name="allow_analytics"
            checked={consent.allowAnalytics}
            onChange={() => dispatch(setAllowAnalytics(!consent.allowAnalytics))}
            />
          <ToggableRow
            label="Allow notification"
            name="allow_notification"
            checked={consent.allowNotification || false}
            onChange={() => dispatch(setAllowNotification(!consent.allowNotification))}
            />
          <ToggableRow
            label="Allow location"
            name="enable_location"
            checked={consent.allowLocation || false}
            onChange={() => dispatch(setAllowLocation(!consent.allowLocation))}
            />
        </Block>

        <Block>
          <h2>Experience</h2>
          <ToggableRow
            label="Mock chat"
            name="mock_chat"
            checked={experience.mockChat}
            onChange={() => dispatch(setMockChat(!experience.mockChat))}
            />
          <ToggableRow
            label="Wheel of fortune"
            name="wheel_of_fortune"
            checked={experience.wheelOfFortune}
            onChange={() => dispatch(setWheelOfFortune(!experience.wheelOfFortune))}
            />
          <ToggableRow
            label="Exit prompt"
            name="exit_prompt"
            checked={experience.exitPrompt}
            onChange={() => dispatch(setExitPrompt(!experience.exitPrompt))}
            />
          <ToggableRow
            label="Content paywall"
            name="content_paywall"
            checked={experience.contentPaywall}
            onChange={() => dispatch(setContentPaywall(!experience.contentPaywall))}
            />
        </Block>

        <Block>
          <h2>About this session</h2>
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
