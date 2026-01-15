export interface RegistrationData {
  eventId: string;
  leaderName: string;
  leaderPhone: string;
  email: string;
  college?: string;
  members: {
    name: string;
    phone: string;
  }[];
  screenshotFile: File;
}

export interface RegistrationResponse {
  success: boolean;
  error?: string;
  data?: any;
}
