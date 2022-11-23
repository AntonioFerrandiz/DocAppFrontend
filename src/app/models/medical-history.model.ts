export interface MedicalHistory {
    patientId: number,
    dateCreated?: Date,
    description: string,
    age: number,
    ageMeasurement: string,
    weight: number,
    weightMeasurement: string,
    height: number,
    heightMeasurement: string
}