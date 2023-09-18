const _apiUrl = "/api/stylists";

export const getStylists = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
}