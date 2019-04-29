export default function DEBUG() {
  if(process.env.NODE_ENV !== "production") {
    return true
  }
}