export default function toUTCTime(date) {
  if (date === undefined || date === null){
      date = new Date();
  }
  return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() 
}