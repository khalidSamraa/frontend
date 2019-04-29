export const dateText = (date) => {
    date = new Date(date);
    let month = date.getMonth() + 1;
    month < 10? month = `0${month}` : month;
    const year = date.getFullYear();
    let day = date.getDate();
    day < 10? day = `0${day}` : day;
    return `${day}.${month}.${year}`;
}

export const dateInput = (date) => {
    if (date)
    date = new Date(date);
    else
    date = new Date()
    let month = date.getMonth() + 1;
    month < 10? month = `0${month}` : month;
    const year = date.getFullYear();
    let day = date.getDate();
    day < 10? day = `0${day}` : day;
    return `${year}-${month}-${day}`;
}