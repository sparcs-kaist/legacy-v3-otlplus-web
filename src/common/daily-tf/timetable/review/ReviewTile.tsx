import styled from 'styled-components';
import type Review from '../../interface/Review';
import FlexWrapper from '../../FlexWrapper';
import Typography from '../../Typography';
import { semesterEntoKor, SemesterEnum } from '../../enum/semesterEnum';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../../Icon';

const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.colors.Background.Block.default};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Background.Block.dark};
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  gap: 6px;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: keep-all;
  white-space: normal;
`;
const TextWrapper = styled.div`
  width: 100%;
  display: inline-block;
  word-wrap: break-word;
  word-break: keep-all;
  white-space: normal;
  font-size: ${({ theme }) => theme.fonts.Normal.fontSize};
  line-height: ${({ theme }) => `${theme.fonts.Normal.lineHeight}px`};
  font-weight: ${({ theme }) => theme.fonts.Normal.fontWeight};
  color: ${({ theme }) => theme.colors.Text.light};
`;

const GradeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.Highlight.default};
  gap: 4px;
  align-items: center;
  cursor: default;
`;

const ReviewTile: React.FC<{ review: Review; isDictionary?: boolean }> = ({
  review,
  isDictionary = true,
}) => {
  const [liked, setLiked] = useState<boolean>(review.userspecific_is_liked);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dictionary?startCourseId=${review.lecture.id}`);
  };

  return (
    <TileWrapper onClick={handleClick}>
      <TitleWrapper>
        {isDictionary && (
          <>
            <Typography type="NormalBold" style={{ display: 'inline-flex' }}>
              {review.lecture.title}
            </Typography>
            <Typography type="Normal" color="Text.lighter" style={{ display: 'inline-flex' }}>
              {review.course.professors.map((professor) => professor.name).join(', ')}
            </Typography>
          </>
        )}
        <Typography type="Normal" color="Text.lighter" style={{ display: 'inline-flex' }}>
          {`${review.lecture.year} ${semesterEntoKor.get(SemesterEnum[review.lecture.semester])}`}
        </Typography>
      </TitleWrapper>
      <TextWrapper>{review.content}</TextWrapper>
      <BottomWrapper>
        <GradeWrapper>
          <FlexWrapper direction="row" gap={8}>
            <Typography type="Normal">
              추천 <strong>{review.like}</strong>
            </Typography>
            {/* TODO : 숫자로 넘겨주는 값들이 무슨 의미인지..? */}
            <Typography type="Normal">
              성적 <strong>{review.grade}</strong>
            </Typography>
            <Typography type="Normal">
              널널 <strong>{review.load}</strong>
            </Typography>
            <Typography type="Normal">
              강의 <strong>{review.speech}</strong>
            </Typography>
          </FlexWrapper>
        </GradeWrapper>
        {isDictionary && (
          <LikeWrapper
            onClick={(event) => {
              event.stopPropagation();
              setLiked(!liked);
            }}>
            <Icon type={liked ? 'Favorite' : 'FavoriteBorder'} size={17.5} />
            <Typography>좋아요</Typography>
          </LikeWrapper>
        )}
      </BottomWrapper>
    </TileWrapper>
  );
};

export default ReviewTile;
