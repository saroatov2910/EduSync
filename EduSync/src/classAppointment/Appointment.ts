export type AppointmentType = 'זום' | 'פרונטלי' | string;

export interface AppointmentProps {
  studentId: number;
  requestId: number;
  appointmentDate: Date;
  appointmentTime: string;
  appointmentType?: AppointmentType;
  location?: string;
  status?: string;
  appointmentId?: number;

  // Extra/legacy fields that might exist in the original constructor:
  createdAt?: Date;
  updatedAt?: Date;
  notes?: string;
}

export default class Appointment {
  studentId: number;
  requestId: number;
  appointmentDate: Date;
  appointmentTime: string;
  appointmentType: AppointmentType;
  location: string;
  status: string;
  appointmentId: number;
  createdAt?: Date;
  updatedAt?: Date;
  notes?: string;

  // Use an object for safer construction and optional fields
  constructor({
    studentId,
    requestId,
    appointmentDate,
    appointmentTime,
    appointmentType = 'פרונטלי',
    location = '',
    status = 'מתוכננת',
    appointmentId,
    createdAt,
    updatedAt,
    notes,
  }: AppointmentProps) {
    this.studentId = studentId;
    this.requestId = requestId;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
    this.appointmentType = appointmentType;
    this.location = location;
    this.status = status;
    this.appointmentId = appointmentId ?? Date.now(); // default id
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.notes = notes;
  }

  // Helper to revive a plain object (e.g., from localStorage) into a proper instance
  static fromPlain(obj: any): Appointment {
    return new Appointment({
      studentId: Number(obj.studentId),
      requestId: Number(obj.requestId),
      appointmentDate: new Date(obj.appointmentDate),
      appointmentTime: String(obj.appointmentTime),
      appointmentType: obj.appointmentType,
      location: obj.location,
      status: obj.status,
      appointmentId: obj.appointmentId ? Number(obj.appointmentId) : undefined,
      createdAt: obj.createdAt ? new Date(obj.createdAt) : undefined,
      updatedAt: obj.updatedAt ? new Date(obj.updatedAt) : undefined,
      notes: obj.notes,
    });
  }
}
