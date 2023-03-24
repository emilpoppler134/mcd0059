const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function getDate(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return day + " " + month + ', ' + year;
}