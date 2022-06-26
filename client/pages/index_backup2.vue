<template>
<div>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
</div>

</template>
<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'todoリスト',
          align: 'start',
          sortable: false,
          value: 'content',
        },
        { text: '期日', value: 'limit' },
        { text: '優先度', value: 'priority' },
        { text: 'メモ', value: 'memo' },
      ],
      items: [
        {
          content: '洗濯',
          limit: 'today',
          priority: 'low',
          memo: 'なし',
        },
        {
        　content: 'トイレ掃除',
          limit: 'tommorrow',
          priority: 'low',
          memo: 'なし',
        },
        {         
        　content: '洗濯',
          limit: 'next Sunday',
          priority: 'high',
          memo: 'なし',
        },
          {         
        　content: '洗濯',
          limit: 'next Sunday',
          priority: 'high',
          memo: 'なし',
        },
      ],
    }
  }
}
</script>
