import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-xlsx',
  templateUrl: './export-xlsx.component.html',
  styleUrls: ['./export-xlsx.component.scss']
})
export class ExportXlsxComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  exportXlsx(blobData: Blob, fileName: string): void {
    // IE prefix
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, fileName);
    }
    // other browsers
    else {
      const blobFile = new Blob([blobData], { type: 'application/xlsx' });
      const url = window.URL.createObjectURL(blobFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }

  convertBase64xlsxToBlob(base64: string): Blob {
    const byteArrays = [];
    const sliceSize = 512;
    const contentType = 'application/xlsx';
    const byteCharacters = atob(base64);

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
