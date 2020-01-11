import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 5px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.6);
      background: #eee;
    }
    input {
      display: none;
    }
  }
`;
