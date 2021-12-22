import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import GenericModal, { Props as GenericProps} from './GenericModal';

type Props = GenericProps & {
  title: string,
  actions?: React.ReactChild,
}

const Wrap = styled.div`
  background: var(--color-background);
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--gap);
  min-width: min(400px, 100%);
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--gap) calc(var(--gap) * 2 );
  border-bottom: 1px solid red;
  font-size: 1.5rem;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: bold;
`;
const CloseButton = styled.div`
  cursor: pointer;
`;
const Content = styled.div`
  padding: var(--gap) calc(var(--gap) * 2 );
  overflow: auto;
`;
const Actions = styled.div`
  padding: var(--gap) calc(var(--gap) * 2 );
`;

const ActionModal = ({
  title,
  children,
  handleClose,
  actions,
  ...proxiedProps
}: Props) => {
  return (
    <GenericModal {...proxiedProps} handleClose={handleClose}>
      <Wrap>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={handleClose}>
            <FontAwesomeIcon icon={["fas", "times"]} />
          </CloseButton>
        </Header>
        <Content>
          {children}
        </Content>
        {actions && <Actions>{actions}</Actions>}
      </Wrap>
    </GenericModal>
  );
}

export default ActionModal;
