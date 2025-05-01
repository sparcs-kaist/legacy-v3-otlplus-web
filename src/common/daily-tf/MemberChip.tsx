import { useState } from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import PersonIcon from '@mui/icons-material/Person';

interface MemberChipProps {
  width: number;
  height: number;
  partInfo: Map<string, boolean>;
  partCount: number;
}

const MemberChipWrapper = styled.div<{ width: number; height: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${(props) => (props.height - 32) / 2}px;
  left: ${(props) => props.width}px;
  transform: translateX(-100%);
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.Line.divider};
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 32px;
  white-space: nowrap;
  padding: 8px 10px;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.colors.Highlight.default};
  gap: 10px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

const Divider = styled.div`
  height: 1px;
  width: calc(100% - 14px);
  background-color: ${(prop) => prop.theme.colors.Line.divider};
  box-sizing: border-box;
  margin-left: 7px;
`;

const NameCard = styled.div<{ selected: boolean; isButton?: boolean }>`
  height: 32px;
  padding: 7px 10px;
  display: inline-block;
  flex-direction: row;
  justify-content: flex-start;
  color: ${(prop) =>
    prop.isButton
      ? prop.theme.colors.Highlight.default
      : prop.selected
      ? prop.theme.colors.Text.default
      : prop.theme.colors.Text.placeholder};
  font-size: 14px;
  line-height: 17.5px;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  // 영어 이름 너무 긴거 들어오면 잘리게?
  max-width: 200px;
`;

const MemberChip: React.FC<MemberChipProps> = ({ width, height, partInfo, partCount }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // 여기서 로그인 여부에 따라서 다르게 보여주기?
  const myName = 'casio';

  return (
    <MemberChipWrapper width={width} height={height}>
      <HeaderWrapper
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}>
        <IconWrapper>
          <PersonIcon />
        </IconWrapper>
        <Typography type="Normal">{`참여 ${partCount + 1}명 / ${
          Array.from(partInfo.keys()).length + 1
        }명`}</Typography>
      </HeaderWrapper>
      {isExpanded && (
        <>
          <Divider />
          <NameCard selected={true}>{myName}</NameCard>
          {[...partInfo].map(([key, value], index) => (
            <NameCard selected={value} key={index}>
              {key}
            </NameCard>
          ))}
          <NameCard
            selected={true}
            isButton={true}
            onClick={() => {}}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            초대 링크 복사
          </NameCard>
        </>
      )}
    </MemberChipWrapper>
  );
};
export default MemberChip;
