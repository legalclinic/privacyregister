<template>
  <svg :class="className"
       :width="width"
       :height="height"
       :fill="(iconColor) ? iconColor : '#009ee0'">
    <use :xlink:href="glyph" />
  </svg>
</template>

<script>
export default {
  /**
   *
   * We use this to component to load our icons from the icons.svg file
   *
   * Available parameters:
   * - className : Custom class name if you wish to add one
   * - glyph     : Source file of your sprites/glyphs
   * - width     : Define the width of your icon
   * - height    : Define the height of your icon
   * - iconColor : Define the color of your icon
   *
   * Example usage:
   * <cl-icon :glyph="'./static/img/icons.svg#icon-info"
   *          className="custom-class"
   *          width="13px"
   *          height="13px"></cl-icon>
   *
   */
  props: ['className', 'glyph', 'width', 'height', 'iconColor'],
};
</script>

<style scoped>
.icon {
  display: inline-block;
}
</style>
