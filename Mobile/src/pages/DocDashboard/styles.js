import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 15px;
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

export const ScheduleList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 30px;
`;

export const Scheduled = styled.View`
  background: #f5f5f5;
  height: 140px;
  flex: 1;
  border-radius: 4px;
  padding: 20px;
  align-items: center;
  margin: 0 10px 20px;
  opacity: ${props => (props.past ? 0.4 : 1)};
`;
export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
export const ClientName = styled.Text`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
`;
export const Time = styled.Text``;

export const CalcelButton = styled.TouchableOpacity`
  display: ${props => (props.cancelable ? 'none' : 'flex')};
`;
