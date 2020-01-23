import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { IoIosNotifications, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import axios from 'axios';
import socketio from 'socket.io-client';

import api from '~/services/api';

import {
  Container,
  Scroll,
  Badge,
  NotificationList,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState();

  const hasUnread = useMemo(
    () => !!notifications.find(notify => notify.read === false),
    [notifications]
  );

  const user = useSelector(state => state.user.profile);

  const socket = useMemo(
    () =>
      socketio('http://192.168.0.12:3333', {
        query: {
          user_id: user.id,
        },
      }),
    [user.id]
  );

  useEffect(() => {
    socket.on('notification', notification => {
      setNotifications([notification, ...notifications]);
      setCount(count + 1);
    });
  }, [socket, notifications, count]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function loadNotifications() {
      try {
        const response = await api.get('/notifications', {
          cancelToken: source.token,
        });
        const data = response.data.map(notify => ({
          ...notify,
          timeDistance: formatDistance(parseISO(notify.createdAt), new Date(), {
            addSuffix: true,
            locale: pt,
          }),
        }));

        setCount(response.data.filter(n => n.read === false).length);
        setNotifications(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          toast.error(err);
        } else {
          throw toast.error(err.response.data.error);
        }
      }
    }
    loadNotifications();
    return () => {
      source.cancel();
    };
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
    setCount(notifications.filter(n => n.read === false).length - 1);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread} count={count}>
        <IoIosNotifications size={25} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unRead={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleRead(notification._id)}
                >
                  OK
                  <IoMdCheckmarkCircleOutline color="#ccc" />
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
