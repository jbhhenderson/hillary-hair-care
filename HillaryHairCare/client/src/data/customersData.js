const _apiUrl = "/api/customers";

export const getCustomers = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
}