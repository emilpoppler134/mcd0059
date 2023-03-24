export default function dateDifference(first, second) {
  const firstDate = new Date(first.split('-')[0], first.split('-')[1] - 1, first.split('-')[2]);
  const secondDate = new Date(second.split('-')[0], second.split('-')[1] - 1, second.split('-')[2]);

  return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
}