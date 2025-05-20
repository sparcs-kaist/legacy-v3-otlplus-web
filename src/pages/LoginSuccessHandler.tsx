import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccessHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      if (navigator.userAgent.includes('otl-app')) {
        window.location.href = `org.sparcs.otl://login?accessToken=${accessToken}&refreshToken=${refreshToken}`;
      } else {
        navigate('/', { replace: true });
      }
    } else {
      // 토큰이 없는 경우 기본 페이지로 리디렉션 또는 에러 처리
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return null;
};

export default LoginSuccessHandler;
