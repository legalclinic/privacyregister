<!-- this is the sidebar page,
all things (css, javascript etc) related to the sidebar should be in this file -->
<template>
  <b-col md="2" class="bg-light sidebar cl-sidebar p-0">
    <b-row vertical class="sidebar-sticky h-100 pt-lg-5 pb-3 pr-md-2 pl-lg-3">

      <b-col cols="12" align-self="start">
        <b-nav vertical>
          <b-nav-item v-if="link.props.visible && link.props.navLocation === 'top'" v-for="link in links"
                      :key="link.props.location"
                      :to="{ name: link.name }"
                      :location="link.props.location"
                      active-class="font-weight-bold">
            <cl-icon :glyph="'./static/img/icons.svg#icon-' + link.props.icon"
                      className="mr-1"
                      width="13px"
                      height="13px"></cl-icon>
            <span class="d-none d-lg-inline-block">{{ link.props.location }}</span>
          </b-nav-item>

        </b-nav>
      </b-col>

      <b-col cols="12" align-self="end">
        <b-nav vertical>
          <b-nav-item v-if="link.props.visible && link.props.navLocation === 'bottom'" v-for="link in links"
                      :key="link.props.location"
                      :to="{ name: link.name }"
                      :location="link.props.location"
                      active-class="font-weight-bold">

            <cl-icon :glyph="'./static/img/icons.svg#icon-' + link.props.icon"
                      className="mr-1"
                      width="13px"
                      height="13px"></cl-icon>
            <span class="d-none d-lg-inline-block">{{ link.props.location }}</span>
          </b-nav-item>


          <!-- add our manual nav item because we have to make it -->
          <!-- trigger a modal and functions which are only availible in this template -->
          <b-nav-item key="logout"
                      @click="showModal('logoutModal')"
                      active-class="font-weight-bold">

            <cl-icon glyph="./static/img/icons.svg#icon-power_settings_new"
                     className=""
                     width="13px"
                     height="13px"></cl-icon>

            <span class="d-none d-lg-inline-block">Delete and Leave</span>
          </b-nav-item>
        </b-nav>
      </b-col>


    </b-row>

    <!-- add our logout modal and tie it to our functions -->
    <b-modal centered id="logoutModal" title="Leave without saving?" class="font-weight-light">
      <p>
        The browser will keep the data as long as you do not delete the local storage.
        Export the register as a JSON to make a backup.
      </p>

      <div slot="modal-footer">
        <b-row>
            <b-button size="md"
                      variant="outline-dark"
                      class="mr-2"
                      @click="hideModal('logoutModal')"
                      >Cancel</b-button>

            <b-button size="md"
                      variant="outline-dark"
                      class="mr-2"
                      @click="emptyStorage"
                      >Delete and Leave</b-button>

            <b-button size="md"
                      variant="primary"
                      class="mr-3"
                      :to="{ name: 'ExportBackup' }"
                      @click="hideModal('logoutModal')"
                      >Export</b-button>
        </b-row>
      </div>
    </b-modal>

  </b-col>
</template>

<script>
const STORAGE_KEYS = ['organisation_info', 'avg_list_controller', 'avg_list_processor'];
export default {
  data() {
    return {
      links: [],
    };
  },
  created() {
    // get all the nested routes in Root that need to be shown in the dashboard sidebar
    this.links = this.$router.options.routes.find(x => x.name === 'Root').children;
  },
  methods: {
    // empty the local storage for each available storage key
    emptyStorage() {
      STORAGE_KEYS.forEach((storageKey) => {
        localStorage.removeItem(storageKey);
      });

      this.$router.push('/');
    },
    showModal(id) {
      // show our modal through the bn::show::modal event which we emit on our chosen id
      this.$root.$emit('bv::show::modal', id);
    },
    hideModal(id) {
      // hide our modal through the bn::hide::modal event which we emit on our chosen id
      this.$root.$emit('bv::hide::modal', id);
    },
  },
};
</script>

<style lang="scss">
  .nav-item {

    .nav-link {
      color: var(--dark)  !important;

      svg {
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }

    &:hover:before {
      content: attr(location);
      position: absolute;
      padding: .5rem;
      white-space: nowrap;
      background-color: var(--light);
      color: var(--primary);
      left: 60px;
      z-index: 1;

      @media (min-width: 992px) {
        display: none;
      }
    }
  }

  .cl-sidebar {
    max-width: 50px;

    @media (min-width: 992px) {
      min-width: 16rem;
      max-width: none;
    }

    .nav-item a {
      padding-bottom: .5rem;
    }
  }
</style>
