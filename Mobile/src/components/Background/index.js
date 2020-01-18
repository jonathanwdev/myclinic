import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  colors: [
    'rgba(35, 51, 197, 0.95)',
    'rgba(35, 160, 257, 1)',
    'rgba(50, 211, 202, 0.9)',
  ],
})`
  flex: 1;
`;
