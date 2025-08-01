export enum AppointmentStatus{
    Active= "active",
    Cancelled= "cancelled"
}

export interface IAppointment{
    id:number,
    date: Date,
    time: Date
    userId: number
    status: AppointmentStatus
}

