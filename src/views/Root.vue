<template>
  <div>
    <b-navbar variant="dark" class="navbar navbar-dark flex-md-nowrap p-0">
      <b-navbar-brand href="#/home" class="col-sm-3 col-md-2 text-center mr-0 px-3 py-3 cl-brand">
        <b-img src="./static/img/logo-clinic.svg" fluid alt="Clinic" />
      </b-navbar-brand>

      <!-- if the user is an active route -->
      <h4 v-if="this.$route.matched.length" class="m-auto py-3 text-white">
        {{ this.$route.matched[1].props.default.location }}
      </h4>

      <!-- otherwise display our default -->
      <h4 v-else class="m-auto py-3 text-white text-center">
        Dashboard
      </h4>
    </b-navbar>


    <b-container fluid>
      <b-row class="cl-wrapper">
        <dashboard-sidebar></dashboard-sidebar>
        <b-col class="cl-content-wrapper p-0 py-5">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">

  .cl-wrapper {
    height: calc(100vh - 122px);
    overflow: hidden;

    @media (min-width: 768px) {
      height: calc(100vh - 62px);
    }
  }

  .cl-brand {
    min-width: 16rem;
    background-color: var(--light);
  }

  .cl-navbar {
    min-height: 30px;
  }

  .cl-content-wrapper {
    width: calc(100vw - 50px);
    height: 100%;
    overflow: auto;

    @media (min-width: 768px) {
      width: inherit;
    }
  }
</style>

<script>
export default {
  data() {
    return {
      links: [],
    };
  },
};
</script>
