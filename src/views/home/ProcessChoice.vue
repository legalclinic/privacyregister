<template>
  <b-col align-content="center" class="text-center h-100">
    <b-row class="h-100">

      <b-col cols="10" md="8" lg="7" class="mx-auto mt-5">
        <h2 class="font-weight-bold">Your processing activities</h2>

        <p class="mb-5">Which processing activities would you like to access? <br/> Choose whether you would like to fill your processing activities as a controller or a processor.</p>

        <cl-button :buttons="buttons" square="1"></cl-button>
      </b-col>

      <b-col cols="10" offset="1" md="8" offset-md="2" align-self="end" class="font-weight-light text-secondary">
        <p>Tip: Not sure what a processor or controller is? Look <b-link href="#/home/faq">here</b-link> for information</p>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { id: 1, title: 'Processing activities as a controller', location: '#/home/activities-controller', size: 'md', variant: 'primary', icon: 'bar_chart', iconColor: '#fff' },
        { id: 2, title: 'Processing activities as a processor', location: '#/home/activities-processor', size: 'md', variant: 'primary', icon: 'bar_chart', iconColor: '#fff' },
      ],
    };
  },
};
</script>
