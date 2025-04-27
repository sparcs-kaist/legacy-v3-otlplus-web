import FlexWrapper from '@/common/daily-tf/FlexWrapper';
import Icon from '@/common/daily-tf/Icon';
import Lecture from '@/common/daily-tf/interface/Lecture';
import Typography from '@/common/daily-tf/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface LectureTileAreaProps {
  lecture: Lecture;
  selectedCourseID: number | null;
  setSelectedCourseID: Dispatch<SetStateAction<number | null>>;
}

const TileWrapper = styled.div`
  width: 100%;
  padding: 7.5px 10px;
  border-top: 1px solid rgba(201, 201, 201, 1);
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LectureTileArea: React.FC<LectureTileAreaProps> = ({
  lecture,
  selectedCourseID,
  setSelectedCourseID,
}) => {
  const isBackground = selectedCourseID != null && selectedCourseID != lecture.course;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <TileWrapper>
      <ContentsWrapper>
        <FlexWrapper gap={2} direction="row">
          <Typography type="NormalBold">{lecture.class_no}</Typography>
          <Typography type="Normal">
            {lecture.professors.map((val) => `${val.name}`).join(', ')}
          </Typography>
        </FlexWrapper>
        <FlexWrapper gap={6} direction="row">
          <Icon
            type={isFavorite ? 'Favorite' : 'FavoriteOutlined'}
            size={14}
            onClick={handleClickFavorite}
          />
          <Icon type="Add" size={14} />
        </FlexWrapper>
      </ContentsWrapper>
    </TileWrapper>
  );
};

export default LectureTileArea;
