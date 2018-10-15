<template>
  <b-container fluid>
    <b-navbar variant="faded" type="light" class="cl-navbar pt-1">
      <b-img src="./static/img/logo-clinic.svg" fluid alt="Clinic" />
    </b-navbar>

    <b-row align-content="center" align-v="center" class="cl-content-wrapper">
      <b-col cols="9" class="mx-auto mt-5">

        <b-col cols="12" lg="8" class="mx-auto text-center">
          <h2 class="font-weight-bold">Organisation info</h2>
          <p>Start by adding information on your organisation. You can edit this information later and at least one way of contact is required in your register. Fields with an <span class="text-danger">*</span> are legally required.</p>
        </b-col>

        <cl-form :form="form" :storageKey="storageKey" :redirect="redirect" :content="content" class="mt-5"></cl-form>

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
const STORAGE_KEY = 'organisation_info';
export default {
  data() {
    return {
      storageKey: STORAGE_KEY,
      redirect: '/review',
      content: 'formInfo',
      form: [
        { key: 'name', type: 'text', title: 'Name of the organisation', value: '', required: true, col: '6' },
        { key: 'contact', type: 'text', title: 'Point of contact', value: '', required: true, col: '6' },
        { key: 'CoC', type: 'text', title: 'Chamber of Commerce-Number', value: '', required: false, col: '12' },
        { key: 'address', type: 'text', title: 'Adress line', value: '', required: true, col: '12' },
        { key: 'phone', type: 'tel', title: 'Phone number', value: '', required: false, col: '6' },
        { key: 'email', type: 'email', title: 'E-mail address', value: '', required: false, col: '6' },
        { key: 'dpoName', type: 'text', title: 'Data Protection Officer name', value: '', required: false, col: '12' },
        { key: 'dpoEmail', type: 'email', title: 'Data Protection Officer email', value: '', required: false, col: '6' },
        { key: 'dpoPhone', type: 'tel', title: 'Data Protection Officer phone number', value: '', required: false, col: '6' },
        { key: 'repName', type: 'text', title: 'Representative name', value: '', required: false, col: '12' },
        { key: 'repEmail', type: 'email', title: 'Representative e-mail address', value: '', required: false, col: '6' },
        { key: 'repPhone', type: 'tel', title: 'Representative phone number', value: '', required: false, col: '6' },
      ],
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
