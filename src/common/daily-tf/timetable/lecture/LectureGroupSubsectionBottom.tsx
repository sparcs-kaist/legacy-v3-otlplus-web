import styled from 'styled-components';
import FlexWrapper from '@/common/daily-tf/FlexWrapper';
import Typography from '@/common/daily-tf/Typography';
import Icon from '@/common/daily-tf/Icon';
import React from 'react';

interface LectureGroupSubsectionBottomProps {
  classNumber: string;
  lectureName: string;
  isWishlisted: boolean;
  setWishlist: () => void;
  isAdded: boolean;
  isSelected: boolean;
}

const Section = styled.div`
  width: 100%;
  padding: 0 10px;
  gap: 12px;
`;

const SectionDefault = styled(Section)`
  background-color: #fafafa;
  &:hover {
    background-color: #ebebeb;
  }
`;

const SectionSelected = styled(Section)`
  background-color: #ebebeb;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #c9c9c9;
  padding: 7px 0;
`;

const TextWrapper = styled.div`
  flex: 0 1 auto;
  flex-direction: row;
  gap: 2px;
  padding: 0 0 0 2px;
  align-items: center;
  display: flex;
  & > * {
    flex: 0 1 auto;
  }
`;

const LectureGroupSubsectionBottom: React.FC<LectureGroupSubsectionBottomProps> = ({
  classNumber,
  lectureName,
  isSelected,
  isWishlisted,
  setWishlist,
  isAdded,
}) => {
  const SectionWrapper = isSelected ? SectionSelected : SectionDefault;

  return (
    <SectionWrapper>
      <ContentsWrapper>
        <TextWrapper>
          <Typography type="NormalBold">{classNumber}</Typography>
          <Typography type="Normal">{lectureName}</Typography>
        </TextWrapper>
        <FlexWrapper gap={6} direction="row" padding="0 0 0 6px">
          <Icon
            type={isWishlisted ? 'Favorite' : 'FavoriteBorder'}
            size={15}
            color={isWishlisted ? '#E54C65' : '#333333'}
            onClick={(e) => {
              e.stopPropagation();
              setWishlist();
            }}
          />
          <Icon
            type="Add"
            size={15}
            color={isAdded ? '#AAAAAA' : '#000000'}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </FlexWrapper>
      </ContentsWrapper>
    </SectionWrapper>
  );
};

export default LectureGroupSubsectionBottom;
