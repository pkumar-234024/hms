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
  decisionNote?: string | null
  reviewedAt?: string | null
}

export interface Prescription {
  id: string
  medicineName: string
  dosage: string
  frequency: string
}
