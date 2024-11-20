import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const exportToExcel = (data, fileName = 'rapor') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rapor');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportToPDF = (data, title = 'Rapor') => {
  // PDF doküman tanımı
  const docDefinition = {
    content: [
      { text: title, style: 'header' },
      { text: new Date().toLocaleDateString('tr-TR'), alignment: 'right' },
      { text: '', margin: [0, 20] }, // Boşluk
      {
        table: {
          headerRows: 1,
          widths: Array(Object.keys(data[0]).length).fill('*'),
          body: [
            Object.keys(data[0]), // Başlıklar
            ...data.map(item => Object.values(item)) // Veriler
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  // PDF oluştur ve indir
  pdfMake.createPdf(docDefinition).download(`${title}.pdf`);
};

// Veriyi dışa aktarma için hazırla
export const prepareExportData = (data, type = 'summary') => {
  if (type === 'summary') {
    return data.map(item => ({
      Kategori: item.name,
      Miktar: item.amount,
      Yüzde: `%${item.percentage}`
    }));
  }

  return data.map(item => ({
    Kurum: item.name,
    Ülke: item.country,
    Gelir: item.income,
    Gider: item.expense
  }));
};
