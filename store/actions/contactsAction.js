export const getContacts = (data) => {
    console.log("get contacts");
    return ({
        type: "GET_CONTACTS",
        payload: data
    })
}