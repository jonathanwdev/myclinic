import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 0 30px;
  flex: 1;
`;
export const DoctorsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 30px;
  flex: 1;
`;

export const Doctor = styled.View`
  flex-direction: row;
  border: 2px solid #1abbb6;
  padding: 15px;
  background: #f5f5f5;

  justify-content: space-between;
  border-radius: 7px;
  margin-bottom: 15px;
`;

export const Info = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Name = styled.Text`
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
`;

export const AboutDoc = styled.View`
  flex-direction: row;
`;
export const Profession = styled.Text`
  text-transform: uppercase;
  color: #5059b8;
  font-size: 13px;
  flex: 2;
`;

export const FiredButton = styled.TouchableOpacity`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const RegisterButton = styled(Button)`
  margin-bottom: 15px;
`;
