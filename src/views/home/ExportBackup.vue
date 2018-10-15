<template>
  <b-col align-content="center" class="text-center h-100">
    <b-row class="h-100">

      <b-col cols="10" md="8" lg="7" class="mx-auto mt-5">
        <h2 class="mb-5 font-weight-bold">You can export a backup here</h2>

        <cl-button :buttons="buttons" square="1"></cl-button>
      </b-col>

      <b-col cols="10" offset="1" md="8" offset-md="2" align-self="end" class="font-weight-light text-secondary">
        <p>Tip: Make sure you store this file safely. This backup can be used to continue working on a Register at a later moment.</p>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import $ from 'jquery';

const STORAGE_KEYS = ['organisation_info', 'avg_list_controller', 'avg_list_processor'];
export default {
  data() {
    return {
      json: {},
      buttons: [
        { id: 'export', title: 'Export as JSON', size: 'md', variant: 'primary', icon: 'move_to_inbox', iconColor: '#fff' },
      ],
    };
  },
  mounted() {
    // fill the json variable with all the data from local storage using the storage keys
    const vm = this;
    STORAGE_KEYS.forEach((storageKey) => {
      // only export the local storage item if it exists
      if (localStorage.getItem(storageKey)) {
        vm.json[storageKey] = JSON.parse(localStorage.getItem(storageKey));
      }
    });

    const today = this.getDate();

    // change the export button attributes to download a json file on click
    const data = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.json))}`;
    $('#export').attr('href', `data:${data}`).attr('download', `${today} Privacy Register Backup.json`);
  },
  methods: {
    // method that returns the current date
    getDate() {
      const date = new Date();
      let dd = date.getDate();
      let mm = date.getMonth() + 1; // as January is 0
      const yyyy = date.getFullYear();

      dd = (dd < 10) ? `0${dd}` : dd;
      mm = (mm < 10) ? `0${mm}` : mm;

      return (`${dd}${mm}${yyyy}`);
    },
  },
};
</script>
