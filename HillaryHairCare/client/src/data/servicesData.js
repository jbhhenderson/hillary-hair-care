const _apiUrl = "/api/services";

export const getServices = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
};