<template>
    <div class="counter">
        <div class="mainPage">
            <div class="navBar">
                <div class="dateBar">date</div>
                <div class="todoId">#id</div>
                <div class="descriptionBar">description</div>
                <div class="operationBar">operation</div>
            </div>
            <div class="content">
                <div :class="'content' + content.id" v-for="(content) in contents" :key="content.id">
                    <div :class="'content' + content.id + 'date'" :style="{ 'width': '20vw' }">
                        {{ content.date }}
                    </div>
                    <div :class="'content' + content.id + 'id'" :style="{ 'width': '10vw' }">
                        {{ content.id }}
                    </div>
                    <div :class="'content' + content.id + 'description'" :style="{ 'width': '35vw' }">
                        {{ content.description }}
                    </div>
                </div>
            </div>
            <div class="bottomBar">
                <div class="pagination">
                    Pagination
                </div>
                <div class="search">
                    Search
                </div>
                <div class="add">Add+</div>
                <div class="delete">Delete-</div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
const contents = reactive([
    {
        date: "2020/8/14",
        id: "1",
        description: "完成todoList1",
    },
    {
        date: "2020/8/15",
        id: "2",
        description: "完成todoList2",
    },
    {
        date: "2020/8/15",
        id: "3",
        description: "完成todoList3",
    },
    {
        date: "2020/8/15",
        id: "4",
        description: "完成todoList4",
    },
    {
        date: "2020/8/15",
        id: "5",
        description: "完成todoList5",
    },
    {
        date: "2020/8/15",
        id: "6",
        description: "完成todoList6",
    },

]);

</script>

<style  lang="scss" scoped>
@import './todoList.scss';
</style>