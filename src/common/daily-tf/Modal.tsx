import { IconButton } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Typography from './Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
`;

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  min-width: 400px;
  width: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  pointer-events: auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title = '' }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <OverlayBackground />
      <Overlay>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <HeaderWrapper>
            <Typography type="BigBold">{title}</Typography>
            <IconButton
              onClick={onClose}
              style={{ color: 'rgba(170, 170, 170, 1)', width: '16px', height: '18px' }}>
              <CloseIcon />
            </IconButton>
          </HeaderWrapper>
          {children}
        </ModalContainer>
      </Overlay>
      ,
    </>,
    document.body, // 모달을 루트 DOM에 렌더링
  );
};

export default Modal;
