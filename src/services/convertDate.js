export const convertDate = (data) => {
    data?.map(item => item.createdAt = new Date(item.createdAt).toLocaleString());
    data?.map(item => item.updatedAt = new Date(item.updatedAt).toLocaleString());
    return data;
};