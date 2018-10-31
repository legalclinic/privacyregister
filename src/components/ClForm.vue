<template>
  <div class="d-flex w-100 cl-form-wrapper">
    <b-col
      cols="1"
      v-if="Number.isInteger(activeQuestion)"
      class="text-right float-left d-none d-md-block pr-0 ml-auto">

      <h1
        v-if="type !== 'singleQuestionForm'"
        class="font-weight-bold text-primary">{{ activeQuestion + 1 }}.</h1>
    </b-col>

    <b-form
      @submit="onSubmit"
      :class="(Number.isInteger(activeQuestion) ? 'col-10 col-md-6 mr-auto' : 'col-12 col-lg-8 mx-auto') + ' text-left'">

      <b-row class="px-3 pb-3">
        <!-- display our category name -->
        <b-col cols="12">
          <h1 v-if="Number.isInteger(activeQuestion)" class="font-weight-bold w-100">{{ form[activeQuestion].categoryName }}</h1>
        </b-col>

        <b-col
          v-for="(field, index) in (Number.isInteger(activeQuestion) ? form[activeQuestion].fields : form)"
          cols="12"
          :md="field.col"
          :key="'field' + index">

          <!-- display our label -->
          <label
            :class="((field.labelClass) ? field.labelClass + ' ' : '') + 'w-100 font-weight-light mb-1 cl-label'">
            {{ field.title }}

            <!-- possible render our icon -->
            <i
              v-if="field.info"
              class="d-inline-block">

              <cl-icon
                glyph="./static/img/icons.svg#icon-info-circle"
                width="14px"
                height="14px"
                class="cl-form-info"
                id="info"
                iconColor="inherit"></cl-icon>

              <!-- Add bootstrap vue's bootstrap action because the default bootstraps tooltips kind of.... buggy -->
              <b-tooltip
                target="info"
                placement="right"
                :title="field.info"></b-tooltip>
            </i>

            <span
              v-if="field.required"
              class="text-danger">*</span>
          </label>

          <!-- input field for the text / number / date fields -->
          <b-form-input
            v-if="field.type === 'text' || field.type === 'tel' || field.type === 'email' || field.type === 'number' || field.type === 'date'"
            v-model="formInfo[field.key]"
            :type="field.type"
            :required="field.required"
            :id="field.key"
            class="cl-input"></b-form-input>

          <template
            v-if="field.type === 'checkbox'">
            <div>
              <b-form-group>
                <b-form-checkbox-group
                  stacked
                  indeterminate="false"
                  v-model="formInfo[field.key]"
                  :options="Array.isArray(formInfo[field.sourceOptions]) ? formInfo[field.sourceOptions] : []"></b-form-checkbox-group>
              </b-form-group>
            </div>
          </template>

          <!-- input field for the dropdown field -->
          <b-form-select
            v-if="field.type === 'dropdown'"
            v-model="formInfo[field.key]"
            class="mb-3">

            <template v-for="option in field.options">
              <!-- display our dropdown echo -->
              <b-dropdown-header
                v-if="option.type === 'header'"
                v-bind:key="`${field.key}-header-${option.text}`">{{ option.text }}</b-dropdown-header>

              <!-- display our dropdown option -->
              <b-dropdown-item-button
                v-bind:key="`${field.key}-header-${option.text}`">{{ option.text }}</b-dropdown-item-button>

              <!-- Display our options -->
              <option
                v-bind:key="`${field.key}-${option.text}`"
                v-if="option.type === 'option'"
                :value="option.value">{{ option.text }}</option>
            </template>
          </b-form-select>

          <!-- input field for the multiple select field -->
          <template multiple v-if="field.type === 'selectMultiple'" class="border-0 cl-multiselect">

            <!-- loop through our options -->
            <template v-for="options in field.options">

              <template v-if="options.optionList">

                <!--
                  Toggle our `option.visible` var with @click so we know when to display the `+` or `-`,
                  We use `(options.visible) ? '-' : '+'` to toggle our '+' or '-'.
                -->
                <p
                  v-if="options.optionHeader"
                  v-b-toggle="options.optionHeader"
                  @click="options.visible = !options.visible"
                  v-bind:key="`${field.key}-${options.text}`"
                  class="border-bottom border-primary cl-select-checkbox-header"> {{ options.optionHeader }} {{ (options.visible) ? '-' : '+'}}</p>

                <b-collapse
                  :id="options.optionHeader"
                  :visible="options.visible"
                  v-bind:key="`${field.key}-${options.optionHeader}`"
                  class="cl-collapse">
                  <b-form-group>

                    <b-form-checkbox-group v-model="formInfo[field.key]">

                      <template
                        v-for="option in options.optionList">
                        <b-form-checkbox
                          :value="option.value"
                          v-bind:key="`${field.key}-${option.text}`"
                          :class="((formInfo[field.key] && formInfo[field.key].includes(option.value)) ? 'bg-primary text-white' : '') + ' cl-select-checkbox'">{{ option.text }}</b-form-checkbox>
                      </template>

                    </b-form-checkbox-group>

                  </b-form-group>
                </b-collapse>

              </template>

              <template v-else>
                <b-form-select
                  multiple
                  v-if="field.type === 'selectMultiple'"
                  v-model="formInfo[field.key]"
                  v-bind:key="`${field.key}-${options.text}`"
                  class="border-0 cl-multiselect">

                  <option
                    v-if="options.type === 'header'"
                    :value="options.value"
                    class="border-0 text-dark"
                    disabled> {{ options.text }}</option>

                  <option
                    v-if="options.type !== 'header'"
                    :value="options.value"> {{ options.text }}</option>

                </b-form-select>
              </template>

            </template>

          </template>

        </b-col>

        <b-col
          v-if="!Number.isInteger(activeQuestion)"
          cols="12"
          class="mt-3">

          <b-button
            @click="onSubmit"
            variant="primary"
            class="w-100 font-weight-light">Save</b-button>
        </b-col>
      </b-row>

    </b-form>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      formInfo: {},
      avgList: [],
    };
  },
  props: ['form', 'storageKey', 'content', 'redirect', 'activeQuestion', 'type', 'questionKey', 'singleRow'],
  // the created hook is run after a vue instance is created, thus fills the formInfo object when there is local storage present
  created() {
    if (!this.storageKey.includes('avg_list')) {
      this.formInfo = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }
  },
  // the mounted hook is run after the dom is rendered, thus fills the formInfo object from the form prop when there is no local storage present
  mounted() {
    if ($.isEmptyObject(this.formInfo)) {
      const inputs = this.form;
      const vm = this;

      for (let i = 0; i < inputs.length; i += 1) {
        // if our field/form does not have a `fields` key then save it like this
        if (!inputs[i].fields) {
          this.$set(vm.formInfo, inputs[i].key, '');
          // if the input type is select multiple or a checkbox, the default needs to be an array
          if (inputs[i].type === 'selectMultiple' || inputs[i].type === 'checkbox') {
            this.$set(vm.formInfo, inputs[i].key, []);
          }
        } else {
          // otherwise loop through our fields
          for (let j = 0; j < inputs[i].fields.length; j += 1) {
            const field = inputs[i].fields[j];
            this.$set(vm.formInfo, field.key, '');
            // if the input type is select multiple or a checkbox, the default needs to be an array
            if (field.type === 'selectMultiple' || field.type === 'checkbox') {
              this.$set(vm.formInfo, field.key, []);
            }
          }
        }
      }
    }
  },
  watch: {
    'formInfo.personalDataCategory': {
      handler(newValue) {
        if (this.storageKey === 'avg_list_controller') {
          if (newValue && !Array.isArray(this.formInfo.personalDataCategory)) {
            this.formInfo.personalDataCategory = newValue.split(',');
          } else if (!newValue) {
            this.formInfo.personalDataSpecial = [];
          }
        }
      },
      deep: true,
    },
    // Add an event to the change of the formInfo, we use this to trigger the `skip question` option for conditional questions
    formInfo: {
      handler() {
        // Emit our event
        this.$emit('updateForm');
      },
      deep: true,
    },
  },
  methods: {
    // the onSubmit function saves the data to the local storage
    onSubmit() {
      if (this.type === 'singleQuestionForm') {
        this.saveSingleQuestion();
      } else {
        // if it regards an avg form, the data from the form first needs to be pushed into
        // the present local storage array
        if (this.storageKey.includes('avg_list')) {
          this.avgList = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
          this.formInfo.id = new Date().getTime();
          this.avgList.push(this.formInfo);
          this.$router.go(this.redirect);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(this[this.content]));
        this.$router.push(this.redirect);
      }
    },
    saveSingleQuestion() {
      const results = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      for (let i = 0; i < results.length; i += 1) {
        if (results[i].id === this.singleRow.id) {
          results[i] = this.formInfo;
        }
      }

      localStorage.setItem(this.storageKey, JSON.stringify(results));
      this.$router.go(this.redirect);
    },
  },
};
</script>

<style lang="scss">
  .cl-label {
    color: var(--cl-darkgray);
  }

  .cl-form-info {
    transform: translateY(-50%);
  }

  .cl-input {
    border: 1px var(--lightgray) solid;
    font-weight: 300;
  }

  .cl-select-checkbox-header {
    font-size: 1rem;
    cursor: pointer;
  }

  .cl-select-checkbox {
    margin-bottom: .5rem;
    width: 100%;
    border-radius: .5rem;
    border: 1px solid var(--primary);
    white-space: pre-line;
    font-size: 1rem;

    .custom-control-label {
      width: 100%;
      padding: .5rem .5rem .5rem 0;
      cursor: pointer;

      &:before,
      &:after {
        display: none;
      }
    }
  }

  .personaldata {
    width: calc(100% - 52px);
  }
</style>
