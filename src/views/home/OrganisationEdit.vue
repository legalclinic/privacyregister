<template>
<b-col align-content="center" class="text-center content-wrapper">
  <b-row>
    <b-col cols="9" class="mx-auto mt-5">
      <h3 class="font-weight-bold">Edit info</h3>
      <p><small>Everything with <span class="text-danger">*</span> is required</small></p>

      <cl-form :form="form" :storageKey="storageKey" :redirect="redirect" :content="content"></cl-form>
    </b-col>
  </b-row>


  <!-- add our leave without saving modal  -->
  <b-modal id="leaveWithoutSaving" title="Leave without saving?" class="font-weight-light">
    <p>
      Would you like to save before you leave?
    </p>

    <div slot="modal-footer">
      <b-row>
        <b-button size="md"
                  variant="outline-dark"
                  class="mr-2"
                  @click="hideModal('leaveWithoutSaving')"
                  >Leave</b-button>

        <b-button size="md"
                  variant="primary"
                  class="mr-2"
                  >Save</b-button>
      </b-row>
    </div>
  </b-modal>
</b-col>
</template>

<script>
const STORAGE_KEY = 'organisation_info';
export default {
  data() {
    return {
      storageKey: STORAGE_KEY,
      redirect: '/home/organisation',
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
  methods: {
    hideModal(id) {
      this.$root.$emit('bv::hide::modal', id);
    },
  },
};
</script>
