  <template>
    <v-icon
      small
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-pencil
    </v-icon>
  </template>
<script>
export default ({
    methods: {
        editItem(item){
            this.$emit('click', item);
        }
    }
})
  </script>