const _apiUrl = "/api/appointments";

export const getAppointments = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
};

export const getAppointment = async (id) => {
    return await fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const updateAppointment = async (appointmentId, appointmentObj) => {
    return await fetch(`${_apiUrl}/update/${appointmentId}`,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentObj)  
})
};

export const addAppointment = async (appointment) => {
    return await fetch(`${_apiUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    });
};

export const cancelAppointment = async (appointmentId) => {
    return await fetch(`${_apiUrl}/${appointmentId}`, {
        method: "DELETE",
    })
}