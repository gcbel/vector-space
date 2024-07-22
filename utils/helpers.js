/* FUNCTIONS */
function getDate(date) {
  return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(
    date
  ).getFullYear()}`;
}

/* EXPORTS */
module.exports = { getDate };
