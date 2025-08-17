import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  map: {
    width: width - 32,
    height: height * 0.5,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
