export type Track = {
  id: string;
  name: string;
  description: string;
  coordinates: { latitude: number; longitude: number }[];
};

export type RootStackParamList = {
  Auth: undefined;
  MainMenu: undefined;
  Register: undefined;
  Profile: undefined;
  Achievements: undefined;
  TrackList: undefined;
  TrackDetail: { track: Track };
  Tracking: { track: Track };
  RideHistory: undefined;
  Settings: undefined;
};

