export const formatDate = (dateToFormat: string, location: string) => {
    const date = new Date(dateToFormat);
    const formatter = new Intl.DateTimeFormat(location, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    return formatter.format(date);
};
