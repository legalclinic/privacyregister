<template>
  <b-container fluid>

    <!-- Display our navbar -->
    <b-navbar
      variant="faded"
      type="light"
      class="cl-navbar pt-1">

      <!-- Display our logo -->
      <b-img src="./static/img/logo-clinic.svg" fluid alt="Clinic" />

    </b-navbar>

    <!-- Wrap our content with a fancy grift wrapper -->
    <b-row align-content="center" align-v="center" class="cl-content-wrapper">

      <!-- Wrap our content in a col -->
      <b-col cols="10" sm="6" lg="4" align-self="center" class="mx-auto text-center">

        <!-- Display our title -->
        <h1 class="font-weight-bold mb-3">Welcome</h1>

        <!-- Display our content -->
        <p class="font-weight-light">Article 30 of the General Data Protection Regulation (GDPR) brings into existence an obligation for controllers and processors to maintain a record of processing activities. Privacy Register is an open standard that could be used to fulfill this obligation.</p>
        <p class="font-weight-light">Do you have an existing register? Or would you like to start a new one?</p>

        <!-- Load our buttons -->
        <cl-button :buttons="buttons"></cl-button>

      </b-col>
    </b-row>

    <!-- Display our fotoer -->
    <div class="cl-footer text-center mt-4 mt-md-0">

      <!-- Add our footer text -->
      <p class="text-secondary-dark">
        v1.0<br>
        © Clinic 2018
      </p>

    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      // Define our buttons
      buttons: [
        { id: 1, title: 'No, create a new one', location: '#/conditions?create=1', size: 'md', variant: 'primary', textColor: 'white' },
        { id: 2, title: 'Yes, upload a register', location: '#/conditions', size: 'md', variant: 'secondary', textColor: 'white' },
      ],
    };
  },
  created() {

  },
};
</script>

<style lang="scss">
  // Style our navbar
  .cl-navbar {
    height: 5rem;
  }

  // Style our content
  .cl-content-wrapper {
    min-height: calc(100vh - 11rem);

    @media (min-width: 768px) {
      min-height: calc(100vh - 10rem);
    }
  }

  // Style our footer
  .cl-footer {
    height: 3rem;
  }
</style>
