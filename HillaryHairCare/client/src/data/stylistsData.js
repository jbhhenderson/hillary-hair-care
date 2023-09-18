const _apiUrl = "/api/stylists";

export const getStylists = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
}

export const addStylist = async (stylist) => {
    return await fetch(`${_apiUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stylist),
    }).then((res) => res.json());
};

export const changeStylistEmployment = async (stylistId) => {
    return await fetch(`${_apiUrl}/change-employment-status/${stylistId}`, {
        method: "PUT"
    });
};