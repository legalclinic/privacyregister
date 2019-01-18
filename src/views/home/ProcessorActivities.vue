<template>
  <b-col align-content="center" cols="12" class="text-center content-wrapper">

    <b-row>

      <b-col cols="12">

        <b-row>

          <!-- Add our buttons(new activity / delete) and add our search bar -->
          <div class="d-flex pl-3 w-100">

            <!-- Display our save new row button -->
            <b-button
              v-if="addRow"
              variant="primary"
              size="sm"
              class="mr-3 py-0"
              @click="addNewItem">Save</b-button>

            <!-- Display the New activity button -->
            <b-button variant="outline-dark"
                      size="sm"
                      class="mr-3 py-0 cl-new-row"
                      @click="showModal('modalForm')">New activity</b-button>

            <!-- Display our delete row button -->
            <b-button variant="outline-dark"
                      size="sm"
                      class="mr-3 py-0 cl-delete-row"
                      @click="showModal('deleteRow')">Delete</b-button>

            <!-- Display our search button -->
            <div>
              <label class="pl-r"><small>Search:</small></label>
              <b-form-input v-model="search" class="w-auto d-inline-block cl-search border-secondary"/>
            </div>
          </div>

          <!-- Display our table wrapper -->
          <b-col cols="12" class="cl-table px-0 mt-4">

            <!-- Load our table -->
            <b-table  striped
                      hover small
                      :current-page="currentPage"
                      :per-page="perPage"
                      :items="filteredList"
                      :fields="fields"
                      @row-dblclicked="toggleEdit"
                      @head-clicked="toggleTopRow"
                      class="cl-table mb-0">

              <!-- Style first item of the table -->
              <template v-if="addRow" slot="top-row" slot-scope="data">

                <template v-for="cellIndex in data.columns">

                  <template v-if="data.fields[cellIndex - 1] && data.fields[cellIndex - 1].key === 'checked'">
                    <td
                      :aria-colindex="cellIndex"
                      @dblclick="toggleEdit(data, 'top')"
                      v-bind:key="`${data.fields[cellIndex - 1].key}-top`">
                      <b-btn
                        size="sm"
                        variant="outline-dark"
                        class="p-0"
                        @click.stop="toggleRowSelect('top')"
                        :class="(selectedRows.includes('top') ? 'active' : false) + ' cl-checkbox'">
                      </b-btn>
                    </td>
                  </template>

                  <!-- If edit mode is not active -->
                  <template v-else-if="( !selectedRows.includes('top') ? editedItem !== data.fields[cellIndex - 1].key + '_top' : false)" class="text-left">
                    <td
                      :aria-colindex="cellIndex"
                      @dblclick="toggleEdit(data, 'top')"
                      v-bind:key="`${newItem[data.fields[cellIndex - 1].key]}`-top">
                      {{ newItem[data.fields[cellIndex - 1].key] }}
                    </td>
                  </template>

                  <!-- Otherwise display our input field -->
                  <template v-else>
                    <td
                      :aria-colindex="cellIndex"
                      @dblclick="toggleEdit(data, 'top')"
                      v-bind:key="`${newItem[data.fields[cellIndex - 1].key]}`-top">
                      <input type="text"
                             v-model="newItem[data.fields[cellIndex - 1].key]"
                             @keyup.enter="addNewItem" />
                    </td>
                  </template>

                </template>
              </template>

              <!-- Loop through our fields and display the data for our user -->
              <template v-for="field in fields" :slot="field.key" slot-scope="row">

                <!-- Add a checkbox as first value, we need this so we can select the row -->
                <template v-if="row.field.key === 'checked'">
                  <b-btn
                    size="sm"
                    variant="outline-dark"
                    class="p-0"
                    @click.stop="toggleRowSelect(row.item.id)"
                    :class="(selectedRows.includes(row.item.id) ? 'active' : false) + ' cl-checkbox'"
                    v-bind:key="`${row.field.key}-${field.key}`">
                  </b-btn>
                </template>

                <!-- Display the field value if edit more is not active -->
                <template v-else-if="editedItem !== row.field.key + '_' + row.index" class="text-left">
                  {{ row.value | arrayOutput }}
                </template>

                <!-- Edit mode is active thus, we display the input field -->
                <template v-else>
                  <input
                    type="text"
                    v-model="row.value"
                    @keyup.enter="doneEdit(row)"
                    @blur="doneEdit(row)"
                    v-bind:key="`${row.field.key}-${field.key}`"/>
                </template>

              </template>

            </b-table>

          </b-col>

        </b-row>

        <!-- Display the form for all questions -->
        <cl-modal
          modalId="modalForm"
          title="title content"
          modalClass="modal-form"
          :storageKey="storageKey"
          :formName="formName"
          :redirect="redirect"></cl-modal>

        <!-- Display the form for a single question -->
        <cl-modal
          modalId="singleQuestionForm"
          title="title content"
          modalClass="modal-form"
          type="singleQuestionForm"
          :storageKey="storageKey"
          :questionKey="singleQuestionKey"
          :singleRow="singleRow"
          :formName="formName"
          :redirect="redirect"></cl-modal>

      </b-col>

      <!-- Display our pagination / next / previous button -->
      <b-col class="text-left mt-3 small">

        <!-- Display our Previous button -->
        <b-button
          size="sm" variant="primary"
          @click="currentPage > 1 ? currentPage-- : ''"
          class="mr-2 font-weight-light">Previous</b-button>

        <!-- Display our Next button -->
        <b-button
          size="sm"
          variant="primary"
          @click="parseInt(currentPage) * parseInt(perPage) < filteredList.length ? parseInt(currentPage) * currentPage++ : ''"
          class="mr-2 font-weight-light">Next</b-button>

        <!-- Display our pagination -->
        <h6
          class="d-inline-block text-secondary font-weight-light">
          {{ currentPage * perPage > filteredList.length ? filteredList.length : currentPage * perPage }} of the {{ filteredList.length }} entries
        </h6>
      </b-col>
    </b-row>

    <!-- add our leave without saving modal  -->
    <b-modal
      id="deleteRow"
      title="Delete"
      class="font-weight-light">

      <!-- Display our content -->
      <p>
        Are you sure you want to delete the selected rows?
      </p>

      <!-- Display our footer -->
      <div slot="modal-footer">

        <!-- Display our button wrapper -->
        <b-row>

          <!-- Display our hide modal button -->
          <b-button
            size="md"
            variant="outline-dark"
            class="mr-2"
            @click="hideModal('deleteRow')">Leave</b-button>

          <!-- Display our delete item button -->
          <b-button
            size="md"
            variant="primary"
            class="mr-2"
            @click="deleteItem">Delete</b-button>

        </b-row>
      </div>
    </b-modal>
  </b-col>
</template>


<script>
const STORAGE_KEY = 'avg_list_processor';
export default {
  data() {
    return {
      newItem: {},
      formName: 'formProcessor',
      redirect: '/home/activities-processor',
      editedItem: null,
      selectedRows: [],
      addRow: false,
      storageKey: STORAGE_KEY,
      currentPage: 1,
      perPage: 10,
      search: '',
      fields: [
        {
          key: 'checked',
          label: '<div class="rounded-circle text-white text-center bg-primary cl-add-row">+</div>',
          value: false,
        },
        {
          key: 'controller',
          label: 'Processing personal data for',
          sortable: true,
          edit: false,
        },
        {
          key: 'controllerName',
          label: 'Controller name',
          sortable: true,
          edit: false,
        },
        {
          key: 'controllerContact',
          label: 'Contact details controller',
          sortable: true,
          edit: false,
        },
        {
          key: 'officerName',
          label: 'Data protection officer name',
          sortable: true,
          edit: false,
        },
        {
          key: 'officerEmail',
          label: 'Data protection officer e-mail',
          sortable: true,
          edit: false,
        },
        {
          key: 'officerPhone',
          label: 'Data protection phone number',
          sortable: true,
          edit: false,
        },
        {
          key: 'repName',
          label: 'Representative e-mail address',
          sortable: true,
          edit: false,
        },
        {
          key: 'repEmail',
          label: 'Representative name',
          sortable: true,
          edit: false,
        },
        {
          key: 'repPhone',
          label: 'Representative phone number',
          sortable: true,
          edit: false,
        },
        {
          key: 'dataTransfer',
          label: 'Transfers of personal outside the European Economic Area',
          sortable: true,
          edit: false,
        },
        {
          key: 'security',
          label: 'Security',
          sortable: true,
          edit: false,
        },
      ],
      items: [],
      singleQuestions: ['dataTransfer'],
      singleQuestionKey: '',
      singleRow: [],
    };
  },
  filters: {
    // Remove the " in our frontend through filters
    arrayOutput(value) {
      return Array.isArray(value) ? value.join(', ') : value;
    },
  },
  created() {
    this.items = (JSON.parse(localStorage.getItem(this.storageKey) || '[]'));
  },
  computed: {
    // this filters the list based on the search, which is empty when no search is given en thus gives all the records
    filteredList() {
      const searchTerm = this.search;
      const collection = this.items;

      return collection.filter((item) => {
        const result = Object.values(item).map(value => value.toString().toLowerCase().includes(searchTerm));
        return result.includes(true);
      });
    },
  },
  methods: {
    showModal(id) {
      // show our modal through the bn::show::modal event which we emit on our chosen id
      this.$root.$emit('bv::show::modal', id);
    },
    hideModal(id) {
      this.$root.$emit('bv::hide::modal', id);
    },
    // Toggle our selected value
    toggleRowSelect(rowId) {
      // If the array includes the id disable it otherwise enable
      if (this.selectedRows.includes(rowId)) {
        // Get the index of our item id inside the array
        const itemIndex = this.selectedRows.indexOf(rowId);

        // Remove the item id from the array
        this.selectedRows.splice(itemIndex, 1);
      } else {
        // Push the item id into the array
        this.selectedRows.push(rowId);
      }
    },
    // Toggle our edit field
    toggleEdit(item, index, event) {
      // Define our target
      const target = (event.target.outerHTML.includes('<input')) ? event.target.parentElement : event.target;

      // Get our cell index
      const cellIndex = (Number.isInteger(target.cellIndex)) ? target.cellIndex : false;

      // Grab our key
      const key = this.fields[cellIndex].key;

      // Open modal when the user wants to edit a question that requires a modal
      // Due to lack of time this is a quickfix
      if (this.singleQuestions.includes(key)) {
        // Update our single question key
        this.singleQuestionKey = key;

        // Update our single row
        this.singleRow = item;

        // Show our modal
        this.showModal('singleQuestionForm');
      } else {
        // Change the active `editedItem` to our ID
        this.editedItem = `${key}_${index}`;
      }
    },
    doneEdit(row) {
      // get the key and id of the property that is being edited
      const key = row.field.key;
      const id = row.item.id;

      // loop through all the data items to find the one being edited using the id
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].id === id) {
          // update the edited property within the item and save it into local storage
          this.items[i][key] = row.value;
          this.saveToLocalstorage();
        }
      }

      // Remove the top options
      if (this.selectedRows.includes('top')) {
        // Get the index of our item id inside the array
        const itemIndex = this.selectedRows.indexOf('top');

        // Remove the item id from the array
        this.selectedRows.splice(itemIndex, 1);
      }

      // reset our `editedItem` so the input field gets removed
      this.editedItem = null;
    },
    // Toggle our `add data row`
    toggleTopRow(columnKey) {
      // if our key is checked
      if (columnKey === 'checked') {
        // when a new row is requested, fill the newItem object with the keys for model binding using the fields array
        for (let i = 0; i < this.fields.length; i += 1) {
          const fieldKey = this.fields[i].key;
          // the checked field should not be present in the
          if (fieldKey !== 'checked') {
            this.newItem[fieldKey] = '';
          }
        }
        // Auto select the top row
        if (!this.selectedRows.includes('top')) {
          this.selectedRows.push('top');
        }

        // toggle our `addRow` var
        this.addRow = !this.addRow;
      }
    },
    // add a new item to the list
    addNewItem() {
      // set the id of the newly greated item
      this.newItem.id = new Date().getTime();
      // push it in the items array
      this.items.push(this.newItem);
      // update the local storage with the new items array
      this.saveToLocalstorage();

      // empty the newItem object after save
      this.newItem = {};
      // hide the new row
      this.addRow = !this.addRow;
    },
    // detele the selected items
    deleteItem() {
      // delete the items where the id matches the id's in selectedRows
      this.items = this.items.filter(item => !this.selectedRows.includes(item.id));

      this.saveToLocalstorage();
      this.hideModal('deleteRow');
    },
    // seperate function to save the items array to local storage
    saveToLocalstorage() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    },
  },
};
</script>

<style lang="scss">
  .cl-search,
  .cl-new-row,
  .cl-delete-row {
    height: 2rem;
    font-size: 13px;
  }

  .cl-new-row,
  .cl-delete-row {
    background-color: var(--light);
    border: 1px var(--gray) solid;
  }

  .cl-table {
    overflow-x: auto;

    thead {
      th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        white-space: pre;
        padding-right: 1.75rem !important;

        &:first-child {
          font-size: 13px;
          padding-left: 1rem;
          padding-right: 1rem !important;
        }

        &:nth-child(2) {
          padding-left: 1rem;
        }

        &:nth-child(1n+3) {
          padding-left: 1.75rem;
        }
      }
    }

    .cl-add-row:hover,
    .cl-add-row:active,
    .cl-add-row:focus {
      cursor: pointer;
    }

    .b-table-top-row,
    tbody {
      td {
        height: 3rem;
        vertical-align: middle;
        text-align: left;
        font-weight: 300;

        &:first-child {
          text-align: center;
        }

        &:nth-child(2) {
          padding-left: 1rem;
        }

        &:nth-child(1n+3) {
          padding-left: 1.75rem;
        }

        input {
          padding: .25rem;
          width: 100%;
          border-radius: .5rem;
          border: 1px var(--gray) solid;
          font-weight: 300;
          box-shadow: none;

          &::selection {
            background-color: var(--primary);
            color: var(--white);
            margin: .25rem;
          }
        }
      }
    }

    .cl-checkbox {
      width: 12px;
      height:12px;
    }

    .cl-add-row {
      width: 20px;
      height: 20px;
    }
  }
</style>
