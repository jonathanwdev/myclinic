import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;
export const DoctorList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;
export const Doctor = styled(RectButton)`
  background: #fff;
  width: 45%;
  min-height: 150px;
  border-radius: 4px;
  align-items: center;
  padding: 15px;
  margin: 0 10px 20px;
  justify-content: space-between;
`;
export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
export const Name = styled.Text`
  color: #08264a;
  font-weight: bold;
  margin-top: 5px;
  font-size: 13px;
`;
export const Profession = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;
export const Address = styled.Text``;
