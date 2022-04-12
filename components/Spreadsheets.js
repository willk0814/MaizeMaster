import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// info = "Jason He$4/12/2022$B73_Plant01$06/01/2020$A$0.751 +/- 0.032$No Notes"
export default async function exportExcel(info) {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  let date = `${mm}/${dd}/${yyyy}`;

  const infoArray = info.split("$")
  
  let data = [{
    "Tester Name": infoArray[0],
    "Date": infoArray[1],
    "Plant ID - Replicate Number": infoArray[2],
    "Planting Date": infoArray[3],
    "Test Type": infoArray[4],
    "Torsional Stiffness": infoArray[5],
    "Additional Notes": infoArray[6]
  }];

  let ws = XLSX.utils.json_to_sheet(data);
  let wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb,ws,"PlantData")
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });

  const uri = FileSystem.cacheDirectory + 'test_spreadsheet.xlsx';
  console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });

  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: "Data for Spreadsheets",
    UTI: 'com.microsoft.excel.xlsx'
  });
};