import styled from 'styled-components';

const ContentsWrapper = styled.div`
  background-color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
  color: #aaaaaa;
  gap: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const OTLName = styled.div`
  font-size: 19px;
  line-height: 20px;
  font-weight: 300;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const PlaceholderComponenet: React.FC = () => {
  return (
    <ContentsWrapper>
      <OTLName>OTL Plus</OTLName>
      <RowWrapper>
        <div>만든 사람들</div>
        {'|'}
        <div>라이선스</div>
        {'|'}
        <div>개인정보취급방침</div>
      </RowWrapper>
      {'otlplus@sparcs.org'}
      <RowWrapper>
        <div>Ⓒ</div>
        <div>2016,</div>
        <div>SPARCS</div>
        <div>OTL Team</div>
      </RowWrapper>
    </ContentsWrapper>
  );
};

export default PlaceholderComponenet;
