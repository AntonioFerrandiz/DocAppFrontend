export interface Appointment {
    
    appointmentDate: string,
    appointmentStartTime: string,
    appointmentEndTime: string,
    patientId: number,
    patientFullName?: string,
    statusAppointment: string,
}
