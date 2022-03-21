import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default async function exportExcel() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  let date = `${mm}/${dd}/${yyyy}`;

  let data = [{
    "Tester Name": "Jason He",
    "Date": date,
    "Plant ID - Replicate Number": "B73_Plant01",
    "Planting Date": "06/01/2020",
    "Test Type": 'A',
    "Torsional Stiffness": "0.751 +/- 0.032",
    "Additional Notes": ' '
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