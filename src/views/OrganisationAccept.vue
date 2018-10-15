<template>
  <b-container fluid>
    <b-navbar variant="faded" type="light" class="cl-navbar pt-1">
      <b-img src="./static/img/logo-clinic.svg" fluid alt="Clinic" />
    </b-navbar>

    <b-col align-content="center" class="text-center cl-content-wrapper">
      <b-row>
        <b-col cols="11" md="7" class="mx-auto">
          <h2 class="font-weight-bold mb-5"> {{ organisationInfo.name }} </h2>

          <b-row class="text-left py-4 bg-light">
            <!-- display our organisation fields -->
            <b-col cols="12" md="6" class="bg-light pt-4 py-md-4 pl-md-5">

              <!-- Display our organisation name field -->
              <template v-if="organisationInfo.name">
                <p class="font-weight-bold mb-0">Name of the organisation</p>
                <p class="font-weight-light">{{ organisationInfo.name }}</p>
              </template>

              <!-- Display our point of contact field field -->
              <template v-if="organisationInfo.contact">
                <p class="font-weight-bold mb-0">Point of contact</p>
                <p class="font-weight-light">{{ organisationInfo.contact }}</p>
              </template>

              <!-- Display our point of CoC field field -->
              <template v-if="organisationInfo.CoC">
                <p class="font-weight-bold mb-0">Chamber of Commerce-number</p>
                <p class="font-weight-light">{{ organisationInfo.CoC }}</p>
              </template>

              <!-- Display our adress line field -->
              <template v-if="organisationInfo.address">
                <p class="font-weight-bold mb-0">Adress line</p>
                <p class="font-weight-light">{{ organisationInfo.address }}</p>
              </template>

              <!-- Display our phone number field -->
              <template v-if="organisationInfo.phone">
                <p class="font-weight-bold mb-0">Phone number</p>
                <p class="font-weight-light">{{ organisationInfo.phone }}</p>
              </template>

              <!-- Display our email field -->
              <template v-if="organisationInfo.email">
                <p class="font-weight-bold mb-0">E-mail address</p>
                <p class="font-weight-light">{{ organisationInfo.email }}</p>
              </template>
            </b-col>

            <b-col cols="12" md="6" class="bg-light pt-4 py-md-4 pl-md-5">

              <!-- Display our DPO name field -->
              <template v-if="organisationInfo.dpoName">
                <p class="font-weight-bold mb-0">Data Protection Officer name</p>
                <p class="font-weight-light">{{ organisationInfo.dpoName }}</p>
              </template>

              <!-- Display our DPO email field -->
              <template v-if="organisationInfo.dpoEmail">
                <p class="font-weight-bold mb-0">Data Protection Officer e-mail</p>
                <p class="font-weight-light">{{ organisationInfo.dpoEmail }}</p>
              </template>

              <!-- Display our DPO phone field -->
              <template v-if="organisationInfo.dpoPhone">
                <p class="font-weight-bold mb-0">Data Protection Officer phone</p>
                <p class="font-weight-light">{{ organisationInfo.dpoPhone }}</p>
              </template>

              <!-- Display our REP name field -->
              <template v-if="organisationInfo.repName">
                <p class="font-weight-bold mb-0">Representative name</p>
                <p class="font-weight-light">{{ organisationInfo.repName }}</p>
              </template>

              <!-- Display our rep email field -->
              <template v-if="organisationInfo.repEmail">
                <p class="font-weight-bold mb-0">Representative e-mail</p>
                <p class="font-weight-light">{{ organisationInfo.repEmail }}</p>
              </template>

              <!-- Display our REP phone field -->
              <template v-if="organisationInfo.repPhone">
                <p class="font-weight-bold mb-0">Representative phone</p>
                <p class="font-weight-light mb-0">{{ organisationInfo.repPhone }}</p>
              </template>

            </b-col>

          </b-row>

          <cl-button :buttons="buttons" class="mt-3 cl-accept-btn-wrapper"></cl-button>
        </b-col>
      </b-row>
    </b-col>

    <div class="cl-footer text-center text-secondary mt-4 mt-md-0">
      <p>
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
      edit: true,
      storageKey: 'organisation_info',
      redirect: '/home/organisation',
      content: 'formInfo',
      organisationInfo: {},
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
      buttons: [
        { id: 1, title: 'Edit', location: '#/organisation', size: 'md', variant: 'outline-dark' },
        { id: 2, title: 'Yes, this info is correct', location: '#/home/dashboard', size: 'md', variant: 'primary' },
      ],
    };
  },
  // the created hook is run after a vue instance is created, thus fills the organisationInfo object when there is local storage present
  created() {
    this.organisationInfo = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    this.edit = !$.isEmptyObject(this.organisationInfo);
  },
};
</script>

<style lang="scss" scoped>
  .cl-navbar {
    height: 5rem;
  }

  .cl-content-wrapper {
    min-height: calc(100vh - 11rem);

    .cl-accept-btn-wrapper {
      margin-left: -10px;
      margin-right: -10px;
    }

    @media (min-width: 768px) {
      min-height: calc(100vh - 10rem);
    }
  }

  .cl-footer {
    height: 3rem;
  }
</style>
