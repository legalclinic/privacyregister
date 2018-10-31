<template>
  <div>
    <b-row class="row-eq-height justify-content-center">
      <b-col v-for="(button, index) in buttons" :key='index' cols="12" sm="6">
        <b-button ref="btn"
                  :id="button.id"
                  :size="button.size"
                  :variant="button.variant"
                  :href="(button.location) ? button.location : '?'"
                  :class="((button.textColor) ? 'text-' + button.textColor  + ' ': '' ) + (square ? 'p-4 ' : '') + 'w-100 d-flex mx-auto align-items-center flex-column justify-content-center mb-2 cl-btn'"
                  :square="button.square"
                  :style="{ minHeight: height + 'px' }"
                  @click="button.click">
                    <!-- possible render our icon -->
                    <i v-if="button.icon" class="d-block pb-3">
                      <cl-icon :glyph="'./static/img/icons.svg#icon-' + button.icon"
                               width="35px" height="35px"
                               :iconColor="button.iconColor"></cl-icon>
                    </i>

                    <!-- echo our button title -->
                    <span>{{ button.title }}</span>
                  </b-button>
        </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 0,
    };
  },
  props: ['buttons', 'square'],
  methods: {
    onResize() {
      // if we have any referenced buttons
      if (this.square && this.$refs.btn.length > 0) {
        // set the height of our buttons
        this.height = this.$refs.btn[0].clientWidth * 0.6;
      }
    },
  },
  mounted() {
    // if we want square buttons and if we have actual buttons
    if (this.square && this.$refs.btn.length > 0) {
      // Register an event listener when the Vue component is ready
      window.addEventListener('resize', this.onResize);

      // define our dynamic height after the element loaded
      this.height = this.$refs.btn[0].clientWidth * 0.6;
    }
  },
};
</script>

<style lang="scss">
  .cl-btn {
    font-size: 1.125rem;
    white-space: normal;
  }
</style>
