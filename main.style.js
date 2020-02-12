import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    marginTop: 20,
    margin: 20,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  castButton: {
    height: 24,
    width: 24,
    marginRight: 10,
    marginTop: 10,
    tintColor: 'black',
  },
  midiaContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  renderImg: {
    width: 160,
    height: 90,
  },
  textMidia: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default styles;
