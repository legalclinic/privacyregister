<template>
  <b-col align-content="center" class="text-center h-100">
    <b-row class="h-100">

      <b-col cols="10" md="8" lg="7" class="mx-auto mt-5">
        <h2 class="mb-5 font-weight-bold">Export your file as an Excel or CSV file</h2>

        <cl-button :buttons="buttons" square="1"></cl-button>

        <b-table striped v-for="(item, value) in data"
                 :key="value"
                 hover small
                 :id="value"
                 :items="item"
                 class="mt-5 d-none"></b-table>
        </b-col>

      <b-col cols="10" offset="1" md="8" offset-md="2" align-self="end" class="font-weight-light text-secondary">
        <p>Tip: this is not a backup, you can backup the register at <b-link :to="{ name: 'ExportBackup' }">'Export Backup'</b-link>.</p>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import TableExport from 'tableexport';
import $ from 'jquery';

const STORAGE_KEYS = ['organisation_info', 'avg_list_controller', 'avg_list_processor'];
export default {
  data() {
    return {
      data: {},
      tables: [],
      buttons: [
        { id: 'export_excel', title: 'Export as Excel', location: '#', size: 'md', variant: 'primary', icon: 'move_to_inbox', iconColor: '#fff' },
        { id: 'export_csv', title: 'Export as CSV', location: '#', size: 'md', variant: 'primary', icon: 'move_to_inbox', iconColor: '#fff' },
      ],
    };
  },
  created() {
    // fill data with data from local storage based on the storage keys, which can then be placed in the tables
    const vm = this;
    STORAGE_KEYS.forEach((storageKey) => {
      vm.data[storageKey] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    });

    Object.keys(this.data).forEach((item) => {
      if (this.data[item].constructor !== Array) {
        this.data[item] = [this.data[item]];
      }
    });
  },
  mounted() {
    // fill the tables variable with all the data from the tables
    this.tables = $('table');
    const vm = this;

    // add click handlers to both export buttons
    $('#export_excel').click(() => {
      vm.exportToExcel();
    });

    $('#export_csv').click(() => {
      vm.exportToCSV();
    });
  },
  methods: {
    // handles the export of all tables in one excel workbook, each table in its own tabsheet
    exportToExcel() {
      // create table export instance
      const tableExport = new TableExport(this.tables, {
        formats: ['xlsx'],
        bootstrap: true,
        exportButtons: false,
      });

      const tableData = tableExport.getExportData();

      // the data to be shown in the excel sheets
      const exportData = [];
      // info necessary to export to excel, like mime type and file extension
      let xlsxInfo = {};
      // names of the excel sheets
      const tabNames = [];

      // fill the above variables with the information from tableData
      Object.keys(tableData).forEach((tableId) => {
        xlsxInfo = tableData[tableId].xlsx;
        exportData.push(tableData[tableId].xlsx.data);
        tabNames.push(tableData[tableId].xlsx.filename);
      });

      tableExport.exportmultisheet(exportData, xlsxInfo.mimeType, 'Excel Export', tabNames, xlsxInfo.fileExtension, {}, []);
    },
    // handles the export of all tables in three csv files, each table in its own file
    exportToCSV() {
      for (let i = 0; i < this.tables.length; i += 1) {
        // create table export instance
        const instance = new TableExport(this.tables[i], {
          formats: ['csv'],
          exportButtons: false,
        });
        // all the data necessary to get the right export, like the data itself, mime type, file name and file extension
        const exportData = instance.getExportData()[this.tables[i].id].csv;
        // only export the data to a csv file when there is data present
        if (exportData.data) {
          instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
        }
      }
    },
  },
};
</script>
