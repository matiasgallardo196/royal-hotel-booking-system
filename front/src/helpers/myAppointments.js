const AppointmentStatus={
    Active:     "active",
    Cancelled:  "cancelled"
}

const myAppointments= [
    {
        id: 1,
        date: "2022-03-20",
        time: "11:00:00",
        status: AppointmentStatus.Active,
        user: {
            id: 2,
            name: "Rocio Teran",
            email: "alfio2@eaxassmaaaasuffasssaplaes.com",
            birthdate: "1990-05-20",
            nDni: 123435678
        }
    },
    {
        id: 2,
        date: "2023-03-20",
        time: "11:00:00",
        status:AppointmentStatus.Cancelled,
        user: {
            id: 2,
            name: "Rocio Teran",
            email: "alfio2@eaxassmaaaasuffasssaplaes.com",
            birthdate: "1990-05-20",
            nDni: 123435678
        }
    },
    {
        id: 3,
        date: "2023-03-20",
        time: "11:00:00",
        status: AppointmentStatus.Active,
        user: {
            id: 2,
            name: "Rocio Teran",
            email: "alfio2@eaxassmaaaasuffasssaplaes.com",
            birthdate: "1990-05-20",
            nDni: 123435678
        }
    },
    {
        id: 4,
        date: "2023-03-20",
        time: "10:00:00",
        status: AppointmentStatus.Active,
        user: {
            id: 2,
            name: "Rocio Teran",
            email: "alfio2@eaxassmaaaasuffasssaplaes.com",
            birthdate: "1990-05-20",
            nDni: 123435678
        }
    }
];

export default myAppointments