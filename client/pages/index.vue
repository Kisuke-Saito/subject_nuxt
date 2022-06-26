<template>
<div id="app">
    <add-task @click="addItem()" />  
      <v-data-table
      :headers="state.headers"
      :items="state.desserts"
      sort-by="calories"
      class="elevation-1"
    >
    <template v-slot:item.actions="{ item }">
        <edit-item
          @click="editItem(item)"
        />
        <delete-item
          @click="deleteItem(item)"
        />
    </template>
    <action-item/>
    <template v-slot:top>
    <v-dialog
    v-model="state.dialog"
    max-width="500px"
    >
      <v-card-text>
        <v-container>
            <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
        >
        <v-text-field
        v-model="state.editedItem.name"
        label="タスク名"
        ></v-text-field>
        </v-col>
            <v-col
            cols="12"
            sm="6"
            md="4"
            >
        <v-text-field
        v-model="state.editedItem.calories"
        label="期日"
        ></v-text-field>
        </v-col>
        <v-col
        cols="12"
        sm="6"
        md="4">
        <v-text-field
        v-model="state.editedItem.fat"
        label="優先度"
        ></v-text-field>
        </v-col>
        <v-col
        cols="12"
        sm="6"
        md="4"
        >
        <v-text-field
        v-model="state.editedItem.carbs"
        label="メモ"
        ></v-text-field>
    </v-col>
    </v-row>
    </v-container>
    </v-card-text>

    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
        color="blue darken-1"
        text
        @click="close()"
    >
        キャンセル
    </v-btn>
    <v-btn
        color="blue darken-1"
        text
        @click="save()"
    >
        保存
    </v-btn>
    </v-card-actions>
    </v-dialog>
    </template>
  </v-data-table>

    <v-dialog v-model="state.dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">このタスクを削除しますか?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">キャンセル</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">削除</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  useAsync,
  useContext,
  watch,
  nextTick,
} from '@nuxtjs/composition-api'
import TodoList from '../components/TodoList.vue'
import EditItem from '../components/EditItem.vue'
import DeleteItem from '../components/DeleteItem.vue'
import AddTask from '../components/AddTask.vue'

export default defineComponent({
    components: {
    TodoList,
    EditItem,
    DeleteItem,
    AddTask,
    },
  
  setup() {
    const { app } = useContext()
    const state = reactive(
      {
      desserts: [] as any[],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'タスク名',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '期日', value: 'calories' },
        { text: '優先度', value: 'fat' },
        { text: 'メモ', value: 'carbs' },
        { text: '編集/削除', value: 'actions', sortable: false },
      ],
    })

    useAsync(async () => {
      state.desserts = await app.$axios.$get('http://localhost:4000')
    })

    watch(
      () => state.dialog, (val) => {
      val || close()
    })

    watch(
      () => state.dialogDelete, (val) => {
      val || closeDelete()
    })


    const addItem  = () => {
      state.dialog = true
    }

    const editItem  = (item: any) => {
      state.editedIndex = state.desserts.indexOf(item)
      state.editedItem = Object.assign({}, item)
      state.dialog = true
    }

    const deleteItem  = (item: any) => {
      app.$axios.post('http://localhost:4000/todo/delete',item)
      state.editedIndex = state.desserts.indexOf(item)
      state.editedItem = Object.assign({}, item)
      state.dialogDelete = true
    }

    const deleteItemConfirm = () => {
      state.desserts.splice(state.editedIndex, 1)
      closeDelete()
    }

    const close  = () => {
      state.dialog = false
      nextTick(() => {
        state.editedItem = Object.assign({}, state.defaultItem)
        state.editedIndex = -1
      })
    }

    const closeDelete  = () => {
      state.dialogDelete = false
      nextTick(() => {
        state.editedItem = Object.assign({}, state.defaultItem)
        state.editedIndex = -1
      })
    }

    const save  = () => {
    var editedItm = state.editedItem;
      // 編集
    if (state.editedIndex > -1) {
    app.$axios.post('http://localhost:4000/todo/update',editedItm)
    Object.assign(state.desserts[state.editedIndex], state.editedItem)
      // 追加
    } else {
        app.$axios.post('http://localhost:4000/todo/insert',editedItm)
        state.desserts.push(state.editedItem)
    }
      close()
    }

    return {
    state,
    addItem,
    save,
    closeDelete,
    close,
    deleteItemConfirm,
    deleteItem,
    editItem,
    }
  },
})

</script>
