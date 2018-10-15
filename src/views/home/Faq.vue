<template>
  <b-col align-content="center" class="text-center content-wrapper bg-white">
    <b-row>

      <b-col cols="10" md="8" lg="7" class="mt-5 mx-auto">

        <h2 class="font-weight-bold"> Having questions? </h2>
        <p>Here is an overview of the most commonly asked questions.</p>

        <div class="text-left mt-4">

          <div role="tablist">

            <b-card no-body v-for='q in questions' :key="'q-' + q.id" class="border-radius-0">

              <b-card-header header-tag="header" class="p-0 bg-light" role="tab">
                <b-btn block href="#"
                             v-b-toggle="'q-' + q.id"
                             variant="light  border-radius-0"
                             class="font-weight-bold text-left text-primary cl-q-title"
                             >{{ q.title }}</b-btn>
              </b-card-header>

              <b-collapse :id="'q-' + q.id" visible accordion="questions" role="tabpanel">

                <b-card-body>
                  <p class="card-text">
                    {{ q.description }}
                  </p>
                </b-card-body>

              </b-collapse>
            </b-card>

          </div>

        </div>

        <h6 class="text-secondary font-weight-light mt-4">
          <small>Not found what you are looking for? Please <a href="https://clinic.nl/vraag-indienen/" target="_blank">contact us</a>.</small>
        </h6>

      </b-col>

    </b-row>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      // enable double quotes on these strings since the string contains ' characters
      /* eslint quotes: [2, "double"] */
      /* eslint-disable max-len */
      questions: [
        { id: 1, title: "What is personal data?", description: "According to Article 4(1) GDPR 'personal data' is any information relating to an identified or identifiable natural person (‘data subject’); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person." },
        { id: 2, title: "What is processing?", description: "Article 4(2) GDPR defines 'processing' as 'any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.'" },
        { id: 3, title: "What is a controller?", description: "Article 4(7) GDPR defines a 'controller' as 'the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.'" },
        { id: 4, title: "What is a processor?", description: "According to article 4(8) GDPR a 'processor' is 'a natural or legal person, public authority, agency or other body which processes personal data on behalf of the controller.'" },
      ],
    };
  },
};
</script>

<style scoped>
  .cl-q-title {
    white-space: pre-line;
  }

  .card:nth-child(n+2) header {
    border-radius: 0;
  }
  .card:nth-child(n+2) {
    border-top: 0;
    border-radius: 0;
    border-bottom: 0;
  }

  .card .collapsing,
  .card .collapse.show {
    border-bottom: 1px solid rgba(0,0,0,0.125);
  }
</style>
