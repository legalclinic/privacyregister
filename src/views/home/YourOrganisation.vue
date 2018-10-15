<template>
  <b-col class="text-center bg-white mt-5">
    <b-row>
      <b-col cols="11" md="7" class="mx-auto">
        <h2 class="font-weight-bold mb-5"> {{ organisationInfo.name }} </h2>

        <b-row class="text-left">

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

          <!-- display our edit/create button -->
          <b-button
            variant="primary"
            size="md"
            :to="buttonUrl"
            class="mt-4 w-100"> {{ edit ? "Edit" : "Create" }} </b-button>

        </b-row>

      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      buttonUrl: '/home/organisation/edit',
      edit: true,
      storageKey: 'organisation_info',
      organisationInfo: {},
    };
  },
  // the created hook is run after a vue instance is created, thus fills the organisationInfo object when there is local storage present
  created() {
    this.organisationInfo = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    this.edit = !$.isEmptyObject(this.organisationInfo);
  },
};
</script>

<style scoped>
 p {
   white-space: pre-line;
 }
</style>
