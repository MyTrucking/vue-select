export default {
  data() {
    return {
      pointer: -1
    }
  },

  watch: {
    filteredOptions() {
      for (let i = 0; i < this.filteredOptions.length; i++) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i;
          break;
        }
      }
    }
  },

  computed: {
    typeAheadPointer: {
      get() {
        if (this.pointer === -1) {
          return this.filteredOptions.findIndex( option => this.isOptionSelected(option));
        } else {
          return this.pointer
        }
      },
      set(index) {
        return this.pointer = index
      }
    }
  },

  methods: {
    /**
     * Move the typeAheadPointer visually up the list by
     * setting it to the previous selectable option.
     * @return {void}
     */
    typeAheadUp() {
      for (let i = this.typeAheadPointer - 1; i >= 0; i--) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i;
          this.typeAheadMaybeSelect();
          if( this.maybeAdjustScroll ) {
            this.maybeAdjustScroll()
          }
          break;
        }
      }
    },

    /**
     * Move the typeAheadPointer visually down the list by
     * setting it to the next selectable option.
     * @return {void}
     */
    typeAheadDown() {
      for (let i = this.typeAheadPointer + 1; i < this.filteredOptions.length; i++) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i;
          this.typeAheadMaybeSelect();
          if( this.maybeAdjustScroll ) {
            this.maybeAdjustScroll()
          }
          break;
        }
      }
    },

    /**
     * Select the option at the current typeAheadPointer position.
     * Optionally clear the search input on selection.
     * @return {void}
     */
    typeAheadSelect() {
      if( this.filteredOptions[ this.typeAheadPointer ] ) {
        this.select( this.filteredOptions[ this.typeAheadPointer ] );
      } else if (this.taggable && this.search.length){
        this.select(this.search)
      }

      if( this.clearSearchOnSelect ) {
        this.search = "";
      }
    },

    typeAheadMaybeSelect() {
      if( this.filteredOptions[ this.typeAheadPointer ] ) {
        this.typeAheadUpdateValue( this.filteredOptions[ this.typeAheadPointer ] );
      } else if (this.taggable && this.search.length){
        this.typeAheadUpdateValue(this.search)
      }
    },

    typeAheadUpdateValue(option) {
      if (!this.isOptionSelected(option)) {
        if (this.taggable && !this.optionExists(option)) {
          option = this.createOption(option)
        }
        if (this.multiple) {
          option = this.selectedValue.concat(option)
        }
        this.updateValue(option);
      }
    },
  }
}
