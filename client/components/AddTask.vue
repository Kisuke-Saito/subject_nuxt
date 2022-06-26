<template>
<v-btn
color="primary"
dark
class="mb-2"
@click="addItem()">
タスクを追加
</v-btn>
</template>
<script>
export default ({
    methods: {
        addItem(){
            this.$emit('click');
        }
    }
})
</script>
