<template>
  <b-container fluid>
    <b-navbar variant="faded" type="light" class="cl-navbar pt-1">
      <b-img src="./static/img/logo-clinic.svg" fluid alt="Clinic" />
    </b-navbar>

    <b-row align-content="center" align-v="center" class="cl-content-wrapper">
      <b-col cols="10" sm="8" md="5" align-self="center" class="mx-auto text-left">
        <h1 class="font-weight-bold text-center mb-5">Conditions</h1>
        <p>Privacy Register does not store any data provided by the user. The data is stored in local storage only, which means it is saved in the web browser on this computer.</p>
        <ul>
          <li>Please make sure to backup your register after each session, this can be done by making use of the export backup option.</li>
          <li>If you are using a public computer, make sure you delete <b>ALL of the local data</b>. This can be done using the 'Delete and Leave' option.</li>
        </ul>
        <p>Responsibility for compliancy with GDPR standards ultimately remains with the user. Please do seek legal advice to ensure full GDPR-compliancy.</p>
        <b-form class="mt-4">
          <b-form-checkbox-group>
            <b-form-checkbox v-model="form.conditions"
                            class="font-italic"
                            >I have read the conditions and accept</b-form-checkbox>
          </b-form-checkbox-group>

          <b-button type="submit"
                    :to="(this.$route.query.create > 0) ? '/organisation' : '/upload'"
                    :variant="(form.conditions.length > 0) ? 'primary' : 'secondary'"
                    class="w-100 mt-4 text-white"
                    :disabled="(form.conditions.length > 0) ? disabled : ''"
                    >Continue</b-button>
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
export default {
  data() {
    return {
      disabled: null,
      form: {
        conditions: false,
      },
    };
  },
};
</script>

<style scoped lang="scss">
  .cl-navbar {
    height: 5rem;
  }
  .cl-content-wrapper {
    min-height: calc(100vh - 11rem);


    @media (min-width: 768px) {
      min-height: calc(100vh - 10rem);
    }
  }

  .cl-footer {
    height: 3rem;
  }
</style>
