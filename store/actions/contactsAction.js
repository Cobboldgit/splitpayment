export const getContacts = (data) => {
    return ({
        type: "GET_CONTACTS",
        payload: data
    })
}