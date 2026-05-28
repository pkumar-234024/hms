export interface AppointmentDto {
  id: string
  hospitalId: string
  hospitalName: string
  patientName: string
  patientEmail: string
  patientPhoneNumber: string
  doctorUserId: string
  doctorName: string
  appointmentDateTime: string
  reason: string
  status: string
  createdAt: string
}

export interface LabReport {
  id: string
  title: string
  date: string
  category: string
  status: string
  fileSize: string
}
