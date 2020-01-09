import styled, { css } from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;
export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  color: #fff;
  transition: color 0.2s ease;

  &:hover {
    color: #36cb4f;
  }

  ${props =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: -3px;
        top: -4px;
        width: 15px;
        height: 15px;
        background: #9bd527;
        content: '${props => (props.count ? props.count : '')}';
        color: #08264a;
        font-size: 10px;
        border-radius: 50%;
      }
    `};
`;

export const NotificationList = styled.div`
  position: absolute;
  z-index: 1;
  width: 270px;
  right: -40px;
  top: calc(100% + 20px);
  background: rgba(0, 0, 0, 0.8);
  padding: 15px 5px;
  border-radius: 3px;
  display: ${props => (props.visible ? 'block' : 'none')}!important;

  &::before {
    content: '';
    position: absolute;
    right: 33px;
    top: -18px;
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 18px solid rgba(0, 0, 0, 0.8);
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }

  p {
    font-size: 1.1rem;
    line-height: 18px;
  }
  time {
    font-size: 1rem;
    opacity: 0.6;
    display: block;
  }

  button {
    font-size: 1.1rem;
    background: none;
    border: none;
    color: ${lighten(0.2, '#9bd527')};
    margin-top: 5px;
  }

  ${props =>
    props.unRead &&
    css`
      &::after {
        content: '';
        display: inline-block;
        margin-left: 5px;
        width: 8px;
        height: 8px;
        background: #9bd527;
        border-radius: 50%;
      }
    `}
`;
