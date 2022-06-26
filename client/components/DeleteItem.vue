<template>
    <v-icon
    small
    @click="deleteItem(item)">
    mdi-delete
    </v-icon>
    </template>
<script>
export default ({
    methods: {
        deleteItem(item){
            this.$emit('click', item);
        }
    }
})
</script>
