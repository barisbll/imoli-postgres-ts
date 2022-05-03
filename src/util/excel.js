const excel = require("exceljs");

_excelHelper = (responseObject, res) => {
  const chars = responseObject.chars;
  const movies = responseObject.movies;

  console.log("HELLOOOOe");
  console.log("HELLOOOOe");
  console.log("HELLOOOOe");
  console.log("HELLOOOOe");
  console.log("HELLOOOOe");

  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Movies");

  worksheet.columns = [
    { header: "Characters", key: "characters", width: 40 },
    { header: "Titles", key: "titles", width: 40 },
  ];

  let row;

  for (
    let counter = 0;
    counter < Math.max(chars.length, movies.length);
    counter++
  ) {
    row = worksheet.getRow(counter + 1);

    if (chars.length > counter) {
      row.getCell(1).value = chars[counter].name;
    }

    if (movies.length > counter) {
      row.getCell(2).value = movies[counter].title;
    }
  }

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + "films.xlsx");
  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
};

module.exports = _excelHelper;
