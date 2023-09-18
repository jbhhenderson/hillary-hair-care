const _apiUrl = "/api/customers";

export const getCustomers = async () => {
    return await fetch(_apiUrl).then((res) => res.json());
};

export const addCustomer = async (customer) => {
    return await fetch(`${_apiUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    }).then((res) => res.json());
};