const _apiUrl = "/api/appointments";

export const getAppointments = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
};