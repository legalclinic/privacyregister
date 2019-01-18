<template>
  <div>
    <b-modal centered
             body-class="modal-dialog-centered"
             :id="modalId"
             :ref="modalId"
             :class="modalClass">

      <header slot="modal-header" class="w-100">
        <b-row>
          <b-col cols="12">
            <!-- Displaying our title -->
            <h5
              class="float-left"
              v-if="!(modalClass && modalClass.includes('modal-form'))">{{ title }}</h5>

            <!-- If this is a form give the 'Close' button -->
            <b-button
              v-if="(modalClass && modalClass.includes('modal-form'))"
              size="sm"
              variant="outline-dark"
              class="float-right"
              @click="hideModal(modalId)"> Close </b-button>

          </b-col>
        </b-row>
      </header>

      <div class="d-block text-left mx-auto"><small>

        <!-- If content is a string -->
        <span v-if="typeof form === 'string'">{{ form }}</span>

        <!-- Else .... -->
        <b-row v-else align-content="center">

          <!-- Otherwise display the regular form -->
          <cl-form
            v-on:updateForm="updateSkipQuestion()"
            ref="form"
            :form="form"
            :type="type"
            :storageKey="storageKey"
            :content="content"
            :redirect="redirect"
            :activeQuestion="activeQuestion"
            :questionKey="questionKey"
            :singleRow="singleRow"></cl-form>

        </b-row>
      </small></div>

      <div slot="modal-footer">
        <b-row>
            <!-- If we use a form modal then we render this -->
            <span class="float-right d-flex"
                  v-if="(modalClass && modalClass.includes('modal-form'))">

              <!-- Display our previous button -->
              <b-button
                v-if="type !== 'singleQuestionForm'"
                size="sm"
                variant="primary"
                class="mr-2"
                @click="previousQuestion()">Previous</b-button>

              <!-- Show 'Next' button untill the last question, where the 'Save' button will be shown -->
              <b-button
                v-if="( (activeQuestion + 1 + ( ( skipQuestion && 'conditional' in this.form[this.activeQuestion] ) ? 1 : 0)) < form.length && type !== 'singleQuestionForm')"
                size="sm"
                variant="primary"
                class="mr-2"
                @click="nextQuestion()">Next</b-button>

              <!-- Display our save button -->
              <b-button
                v-else
                size="sm"
                variant="primary"
                class="mr-2"
                @click="submit()">Save</b-button>

              <!-- Display our current question -->
              <h6
                v-if="type !== 'singleQuestionForm'"
                class="text-secondary font-weight-light form-button-bar mr-2">

                <small>{{ activeQuestion + 1 }} of the {{ this.form.length - ( ( skipQuestion && 'conditional' in this.form[this.activeQuestion] ) ? 1 : 0) }} questions</small>
              </h6>
            </span>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* eslint-disable max-len */
      content: 'avgList',
      form: [],
      skipQuestion: 0,
      activeQuestion: 0,
      formController: [
        {
          categoryName: 'Name data processing activity',
          fields: [
            { key: 'processActivity', type: 'text', title: 'What name would you like to give to this processing activity?', value: '', required: true, col: '12', dynamic: true },
          ],
        },
        {
          categoryName: 'Purpose(s) of the processing activity',
          fields: [
            { key: 'legitimate', type: 'text', title: 'What is the legitimate purpose of this processing activity?', value: '', required: true, col: '12', dynamic: true },
          ],
        },
        {
          categoryName: 'Categories of data subjects',
          fields: [
            { key: 'personalData', type: 'text', title: 'From what types of individuals is personal data collected?', value: '', required: true, col: '12', dynamic: true },
          ],
        },
        {
          categoryName: 'Categories of personal data',
          fields: [
            { key: 'personalDataCategory', type: 'text', title: 'What categories of personal data are being collected for this processing activity? Use commas to separate items.', value: '', required: true, col: '12' },
            { key: 'personalDataSpecial',
              sourceOptions: 'personalDataCategory',
              type: 'checkbox',
              title: 'Specify per category whether the personal data can be qualified as special.',
              labelClass: 'border-bottom border-primary',
              value: '',
              required: true,
              col: '12',
              options: [
                {
                  optionHeader: 'Normal',
                  hideOnRender: false,
                  options: [
                    { type: 'option', value: '1', text: 'Consent data subject (art. 6.1 (a) GDPR)' },
                    { type: 'option', value: '2', text: 'Necessary for the performance of a contract(art. 6.1 (b) GDPR)' },
                    { type: 'option', value: '3', text: 'Necessary for compliance with a legal obligation(art. 6.1 (c) GDPR)' },
                    { type: 'option', value: '4', text: 'Necessary in order to protect the vital interests of the individual (art. 6.1 (d) GDPR)' },
                    { type: 'option', value: '5', text: 'Necessary for the performance of a task carried out in the public interest or in the excercise of official authority vested in the controller. (art. 6.1 (e) GDPR)' },
                    { type: 'option', value: '6', text: 'Necessary for the purposes of the legitimate interests pursued by the controller or by a third party (art. 6.1 (f) GDPR)' },
                  ],
                },
                {
                  optionHeader: 'Special',
                  hideOnRender: true,
                  options: [
                    { type: 'option', value: '7', text: 'Explicit consent data subject (art. 9.2 (a) GDPR)' },
                    { type: 'option', value: '8', text: 'necessary for the purposes of carrying out the obligations and exercising specific rights of the controller or of the data subject in the field of employment and social security and social protection law (art. 9.2 (b) GDPR)' },
                    { type: 'option', value: '9', text: 'necessary to protect the vital interests of the data subject or of another natural person where the data subject is physically or legally incapable of giving consent (art. 9.2 (c) GDPR)' },
                    { type: 'option', value: '10', text: 'carried out in the course of its legitimate activities with appropriate safeguards by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim and on condition that the processing relates solely to the members or to former members of the body or to persons who have regular contact with it in connection with its purposes and that the personal data are not disclosed outside that body without the consent of the data subjects (art. 9.2 (d) GDPR)' },
                    { type: 'option', value: '11', text: 'Processing relates to personal data which are manifestly made public by the data subject (art. 9.2 (e) GDPR)' },
                    { type: 'option', value: '12', text: 'necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity (art. 9.2 (f) GDPR)' },
                    { type: 'option', value: '13', text: 'Necessary for reasons of substantial public interest (art. 9.2. (g) GDPR)' },
                    { type: 'option', value: '14', text: 'Necessary for the purposes of preventive or occupational medicine, for the assessment of the working capacity of the employee, medical diagnosis, the provision of health or social care or treatment or the management of health or social care systems and services on the basis of Union or Member State law or pursuant to contract with a health professional and subject to the conditions and safeguards referred to in paragraph 3 (art. 9.2. (h) GDPR)' },
                    { type: 'option', value: '15', text: 'Necessary for reasons of public interest in the area of public health (art. 9.2 (i) GDPR)' },
                    { type: 'option', value: '16', text: 'Necessary for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) based on Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject. (art. 9.2. (j) GDPR)' },
                  ],
                },
              ],
            },
          ],
        },
        {
          categoryName: 'Legal bases for processing',
          fields: [
            { key: 'legalBase',
              type: 'selectMultiple',
              title: 'What is the legal basis for processing the personal data?',
              value: '',
              required: true,
              col: '12',
              options: [
                {
                  optionHeader: '',
                  visible: true,
                  optionList: [
                    { type: 'option', value: '1', text: '1. Consent data subject (art. 6.1 (a) GDPR)' },
                    { type: 'option', value: '2', text: '2. Necessary for the performance of a contract(art. 6.1 (b) GDPR)' },
                    { type: 'option', value: '3', text: '3. Necessary for compliance with a legal obligation(art. 6.1 (c) GDPR)' },
                    { type: 'option', value: '4', text: '4. Necessary in order to protect the vital interests of the individual (art. 6.1 (d) GDPR)' },
                    { type: 'option', value: '5', text: '5. Necessary for the performance of a task carried out in the public interest or in the excercise of official authority vested in the controller. (art. 6.1 (e) GDPR)' },
                    { type: 'option', value: '6', text: '6. Necessary for the purposes of the legitimate interests pursued by the controller or by a third party (art. 6.1 (f) GDPR)' },
                  ],
                },
                {
                  optionHeader: 'Special',
                  visible: false,
                  optionList: [
                    { type: 'option', value: '7', text: '7. Explicit consent data subject (art. 9.2 (a) GDPR)' },
                    { type: 'option', value: '8', text: '8. Necessary for the purposes of carrying out the obligations and exercising specific rights of the controller or of the data subject in the field of employment and social security and social protection law (art. 9.2 (b) GDPR)' },
                    { type: 'option', value: '9', text: '9. Necessary to protect the vital interests of the data subject or of another natural person where the data subject is physically or legally incapable of giving consent (art. 9.2 (c) GDPR)' },
                    { type: 'option', value: '10', text: '10. Carried out in the course of its legitimate activities with appropriate safeguards by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim and on condition that the processing relates solely to the members or to former members of the body or to persons who have regular contact with it in connection with its purposes and that the personal data are not disclosed outside that body without the consent of the data subjects (art. 9.2 (d) GDPR)' },
                    { type: 'option', value: '11', text: '11. Processing relates to personal data which are manifestly made public by the data subject (art. 9.2 (e) GDPR)' },
                    { type: 'option', value: '12', text: '12. Necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity (art. 9.2 (f) GDPR)' },
                    { type: 'option', value: '13', text: '13. Necessary for reasons of substantial public interest (art. 9.2. (g) GDPR)' },
                    { type: 'option', value: '14', text: '14. Necessary for the purposes of preventive or occupational medicine, for the assessment of the working capacity of the employee, medical diagnosis, the provision of health or social care or treatment or the management of health or social care systems and services on the basis of Union or Member State law or pursuant to contract with a health professional and subject to the conditions and safeguards referred to in paragraph 3 (art. 9.2. (h) GDPR)' },
                    { type: 'option', value: '15', text: '15. Necessary for reasons of public interest in the area of public health (art. 9.2 (i) GDPR)' },
                    { type: 'option', value: '16', text: '16. Necessary for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) based on Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject. (art. 9.2. (j) GDPR)' },
                  ],
                },
              ],
            },
          ],
        },
        {
          categoryName: 'Categories of internal recipients',
          fields: [
            { key: 'recipientInt', type: 'text', title: 'To whom will the data be disclosed / what recipients have access to the data?', value: '', required: true, col: '12' },
          ],
        },
        {
          categoryName: 'Categories of external recipients',
          fields: [
            { key: 'recipientExt', type: 'text', title: 'To whom will the data be disclosed / what recipients have access to the data?', value: '', required: true, col: '12' },
          ],
        },
        {
          categoryName: 'Transfers of personal data to a third country or an international organisation',
          conditional: 'countries',
          fields: [
            {
              key: 'countries',
              type: 'dropdown',
              title: 'Is the data transferred to international organisations or countries outside of the European Economic Area (EU countries plus Norway, Iceland and Liechtenstein)?',
              value: '',
              required: true,
              col: '12',
              options: [
                {
                  type: 'option',
                  value: true,
                  text: 'Yes',
                },
                {
                  type: 'option',
                  value: false,
                  text: 'No',
                },
              ],
            },
          ],
        },
        {
          categoryName: 'Transfers of personal data to a third country or an international organisation',
          fields: [
            { key: 'dataTransfer', type: 'text', info: 'Identify to which countries and/or international organisations the data are being transfered', title: 'To which countries outside of the European Economic Area (EU countries plus Norway, Iceland and Liechtenstein) is the data transferred ?', value: '', required: true, col: '12' },
          ],
        },
        {
          categoryName: 'Retention Period',
          fields: [
            { key: 'retention', type: 'text', title: 'What is the retention period of the personal data?', value: '', required: true, col: '12' },
          ],
        },
        {
          categoryName: 'Security Measures',
          fields: [
            { key: 'technical', type: 'text', title: 'Which technical and organisational security measures have been implemented for this processing activity?', value: '', required: true, col: '12' },
          ],
        },
        {
          categoryName: 'Source',
          fields: [
            { key: 'source', type: 'text', title: 'Where does the personal data originate from?', value: '', required: true, col: '12' },
          ],
        },
      ],
      formProcessor: [
        {
          categoryName: 'Categories of processing',
          fields: [
            { key: 'category', type: 'text', title: 'What category of processing activities would you like to submit?', value: '', required: true, col: '12', dynamic: true },
          ],
        },
        {
          categoryName: 'Controller name',
          fields: [
            { key: 'controller', type: 'text', title: 'For which controller(s) are the personal data being processed?', value: '', required: true, col: '6' },
            { key: 'controllerName', type: 'text', title: 'Name of the controller', value: '', required: true, col: '6' },
            { key: 'controllerContact', type: 'text', title: 'Contact details of the controller', value: '', required: true, col: '6' },
            { key: 'officerName', type: 'text', title: 'Data Protection Officer name', value: '', required: true, col: '6' },
            { key: 'officerEmail', type: 'text', title: 'Data Protection Officer e-mail address', value: '', required: true, col: '6' },
            { key: 'officerPhone', type: 'text', title: 'Data Protection Officer phone number', value: '', required: true, col: '6' },
            { key: 'repName', type: 'text', title: 'Representative e-mail address', value: '', required: true, col: '6' },
            { key: 'repEmail', type: 'text', title: 'Representative name', value: '', required: true, col: '6' },
            { key: 'repPhone', type: 'text', title: 'Representative phone number', value: '', required: true, col: '6' },
          ],
        },
        {
          categoryName: 'Transfers of personal data to a third country or an international organisation',
          conditional: 'dataTransfer',
          fields: [
            {
              key: 'dataTransfer',
              type: 'dropdown',
              title: 'Is the data transferred to international organisations or countries outside of the European Economic Area (EU countries plus Norway, Iceland and Liechtenstein)?',
              value: '',
              required: true,
              col: '12',
              // The values need to be changed to yes and no
              options: [
                {
                  type: 'option',
                  value: true,
                  text: 'Yes',
                },
                {
                  type: 'option',
                  value: false,
                  text: 'No',
                },
              ],
            },
          ],
        },
        {
          categoryName: 'Security Measures',
          fields: [
            {
              key: 'security',
              type: 'text',
              title: 'Which technical and organisational security measures have been implemented for the personal data?',
              value: '',
              required: true,
              col: '12',
            },
          ],
        },
      ],
    };
  },
  props: ['modalId', 'title', 'storageKey', 'formName', 'modalClass', 'redirect', 'type', 'questionKey', 'singleRow', 'currentQuestion'],
  created() {
    this.updateForm();
  },
  watch: {
    // Watch our questionKey attribute
    questionKey() {
      // Update our form
      this.updateForm(this.questionKey);
    },
    // Watch the singleRow attribute, if this changes then update our form value
    singleRow() {
      // update the value of the form to the value of the current field
      this.updateSingleFormValue(this.questionKey);
    },
  },
  methods: {
    updateSkipQuestion() {
      // Get our conditional fields
      const conditionals = this.form.filter(question => question.conditional);

      // Loop through our conditional questions
      // eslint-disable-next-line
      conditionals.map((question) => {
        if (this.$refs.form && this.$refs.form.formInfo && question.conditional) {
          this.skipQuestion = (this.$refs.form.formInfo[question.conditional] ? 0 : 1);
        } else {
          this.skipQuestion = 0;
        }
      });
    },
    // Update our form, we need this to update so we can update the form for our single question
    updateForm(questionKey) {
      // If question key is defined /entered render our single question key
      if (questionKey) {
        // Get the category of our field
        const newCategory = this[this.formName].filter(category =>
          // Return the correct category
          category.fields.find(field => field.key === questionKey),
        );

        // Update our variable
        this.form = newCategory;
      } else {
        // Otherwise display our regular form
        this.form = this[this.formName];
      }
    },
    // Update the value of our field form data,
    // We use this this to update our value in the form to the value of the item in the table
    updateSingleFormValue() {
      // Add our singlerow value to the form, which is found in the refs
      // We send our entire row so we can update multitple values if a category has 2 options e.g Categories of data and special data categories
      // Certain fields also use X question as base for their options and we dont want to make exceptions per question...
      this.$refs.form.formInfo = this.singleRow;
    },
    showModal(id) {
      // show our modal through the bn::show::modal event which we emit on our chosen id
      this.$root.$emit('bv::show::modal', id);
    },
    hideModal(id) {
      // hide our modal through the bn::hide::modal event which we emit on our chosen id
      this.$root.$emit('bv::hide::modal', id);
    },
    // Go to the previous question
    previousQuestion() {
      const child = this.$refs.form;
      if (child.activeQuestion - 1 >= 0) {
        // Call our skipQuestion function checker
        this.updateSkipQuestion();
        // Update our value
        // eslint-disable-next-line
        this.activeQuestion = this.activeQuestion - 1 - (this.form[this.activeQuestion - 2] ? ('conditional' in this.form[this.activeQuestion - 2] ? this.skipQuestion : 0) : 0);
      }
    },
    // Go to the next question
    nextQuestion() {
      const child = this.$refs.form;

      if (child.activeQuestion + 1 < child.form.length) {
        // Update our value
        this.activeQuestion = this.activeQuestion + 1 + ('conditional' in this.form[this.activeQuestion] ? this.skipQuestion : 0);
      }

      // Call our skipQuestion function checker
      this.updateSkipQuestion();
    },
    // Trigger the submit function in the child component (in this case in ClForm.vue)
    submit() {
      const child = this.$refs.form;
      child.onSubmit(this.questionKey, this.singleRow);
    },
  },
};
</script>

<style lang="scss">
  .modal-form {
    .modal-dialog {
      min-width: 100%;
      margin: 0;
    }

    .modal-content {
      min-height: 100vh;
      border: 0;
      border-radius: 0;

      .modal-body,
      .cl-modal-wrapper {
        // Add our max height to the modal wrapper
        // We use this to give our content wrapper 100vh max height
        max-height: calc(100vh - 128px);

        // Add our height to the form wrapper to allow us to scroll
        // through the content regardless of our content height,
        // we will no longer lock the user out of options
        .cl-form-wrapper {
          max-height: calc(100vh - 218px);
          overflow-y: auto;
        }
      }
    }

    .form-button-bar,
    .form-button-bar small {
      vertical-align: sub;
    }

    .modal-footer {
      box-shadow: 0 -10px 30px 0 var(--white);
      border: 0;
      z-index: 1;
    }

    .modal-header {
      border: 0;
    }

  }
</style>
