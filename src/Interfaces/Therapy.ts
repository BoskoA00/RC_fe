export interface Therapy {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  doctor: any;
  patient: any;
  patiendId: number;
  doctorId: number;
  sessionsNumber: number;
  content: string;
}
