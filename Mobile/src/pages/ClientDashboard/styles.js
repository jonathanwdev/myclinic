import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px;
`;

export const DateControl = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const DateButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  margin: 0 20px;
  background: #08264a;
`;
export const DateText = styled.Text`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
`;

export const AppointmentList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-top: 30px;
`;
export const Appointment = styled.View`
  background: #fff;
  border-radius: 5px;
  margin-bottom: 30px;
  justify-content: space-between;
  padding: 10px;
  height: 150px;
  opacity: ${props => (props.past ? 0.6 : 1)};
`;
export const Profile = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #d4dfdf;
  padding: 5px;
  border-radius: 5px;
`;
export const ProfileDetails = styled.View`
  justify-content: space-between;
  margin-left: 5px;
`;
export const Name = styled.Text`
  color: #08264a;
  font-size: 15px;
  font-weight: bold;
`;
export const Profession = styled.Text`
  color: #000;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;
export const Time = styled.Text`
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
export const CancellationButton = styled(Button)`
  background: ${props => (props.cancelable ? '#cb3669' : 'rgba(0,0,0,0.4)')};
  display: ${props => (props.past ? 'none' : 'flex')};
`;
