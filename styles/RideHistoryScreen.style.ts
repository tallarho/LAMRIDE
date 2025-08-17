import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 16, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 16 },
  total: { fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 14 },
  rideItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  duration: { fontSize: 18, fontWeight: '600', color: '#10B981', marginBottom: 4 },
  distance: { fontSize: 16, fontWeight: '500', color: '#2563EB', marginBottom: 4 },
  date: { fontSize: 14, color: '#6B7280' },
  hiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10
  },
  hiddenBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '80%',
    borderRadius: 10
  },
  deleteBtn: { backgroundColor: '#EF4444' },
  repeatBtn: { backgroundColor: '#10B981' },
  hiddenText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#9CA3AF', marginTop: 40 },
  errorText: { color: '#EF4444', fontSize: 16, textAlign: 'center', marginTop: 40 },
});
