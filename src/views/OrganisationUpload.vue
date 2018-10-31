<template>
  <b-container fluid>
    <b-navbar variant="faded" type="light" class="cl-navbar pt-1">
      <b-img src="./static/img/logo-clinic.svg" fluid alt="Clinic" />
    </b-navbar>

    <b-row align-content="center" align-v="center" class="cl-content-wrapper">
      <b-col cols="10" sm="5" md="4" lg="3" align-self="center" class="mx-auto text-center justify-content-center">
        <h1 class="font-weight-bold text-center">Upload a register</h1>

        <p>Upload the register in a .json file with the button below. </p>

        <b-form class="mt-4 text-left">
          <b-form-file placeholder="Choose a file..."
                       accept=".json"
                       id="selectFile"
                       @change="handleFileUpload"></b-form-file>

          <b-button type="submit"
                    to="/home"
                    :variant="(uploaded) ? 'primary' : 'secondary'"
                    class="w-100 mt-4 text-white"
                    :disabled=!uploaded
                    @click="onSubmit">Upload</b-button>
        </b-form>
      </b-col>
    </b-row>

    <div class="cl-footer text-center mt-4 mt-md-0">
      <p class="text-secondary-dark">
        v1.0<br>
        © Clinic 2018
      </p>
    </div>
  </b-container>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      data: {},
      uploaded: false,
    };
  },
  methods: {
    handleFileUpload() {
      // fill the files variable with the uploaded file
      const files = $('#selectFile').prop('files');

      const filereader = new FileReader();
      const vm = this;
      // set an onload function which will be initialised when the load event is fired
      filereader.onload = function get(e) {
        // the text string as a result of the readAsText function is parsed and saved
        vm.data = JSON.parse(e.target.result);
      };
      // read as text is used to read the contents of the uploaded file and the load event is triggered
      filereader.readAsText(files.item(0));

      this.uploaded = !this.uploaded;
    },
    // save each item in the local storage
    onSubmit() {
      Object.keys(this.data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      });
    },
  },
};
</script>
<style lang="scss">
  .cl-navbar {
    height: 5rem;
  }
  .cl-content-wrapper {
    min-height: calc(100vh - 11rem);

    @media (min-width: 768px) {
      min-height: calc(100vh - 10rem);
    }
  }

  .cl-file-label {
    .custom-file-label::after {
      background-color: var(--lightgray);
      color: var(--white);
    }
  }

  .cl-footer {
    height: 3rem;
  }
</style>
