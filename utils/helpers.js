
/* FUNCTIONS */
function format_date(date) {
    return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}
  
/* EXPORTS */
module.exports = format_date