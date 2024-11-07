const getDateToday = ()=>{
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
}
const getDateTimeToday = ()=>{
    const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const day = String(currentDate.getDate()).padStart(2, '0');

  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}
module.exports={
    getDateToday,
    getDateTimeToday
};
