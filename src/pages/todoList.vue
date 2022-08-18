<template>
    <div class="counter">
        <div class="mainPage">
            <div class="navBar">
                <div class="dateBar">
                    Date
                    <div class="dateIcons">
                        <Icon class="dateIconUp" type="md-arrow-dropup" @click="dateSort('up')" />
                        <Icon class="dateIconDown" type="md-arrow-dropdown" @click="dateSort('down')" />
                    </div>
                </div>
                <div class="todoId">#id</div>
                <div class="descriptionBar">description</div>
                <div class="operationBar">operation</div>
            </div>
            <div class="content">
                <div :class="'content' + content.id" v-for="(content) in contents" :key="content.id">
                    <DatePicker :class="'content' + content.id + 'date'" :border="false" @on-focus="onFocus"
                        :style="{ 'width': '20vw', 'text -align': 'center' }" v-model="content.date"
                        placeholder="请选择截止日期">
                    </DatePicker>
                    <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px" /> -->
                    <div :class="'content' + content.id + 'id'" :style="{ 'width': '10vw' }">
                        {{ content.id }}
                    </div>
                    <Input :ref="'descriptionInput' + content.id" :class="'content' + content.id + 'description'"
                        :style="{ 'width': '35vw', 'text-align': 'center' }" :border="false"
                        v-model="content.description">
                    </Input>
                </div>
            </div>
            <div class="bottomBar">
                <div class="pagination">
                    Pagination
                </div>
                <Input class="search" placeholder="Search">
                </Input>
                <Button class="add" @click="addTodo">Add+</Button>
                <Button class="delete" @click="deleteTodo">Delete-</Button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { toRaw } from '@vue/reactivity';
import { reactive, ref } from 'vue';
import { Button, Input, Icon, DatePicker } from 'view-ui-plus';
let currentInstance = '';
onMounted(() => {
    currentInstance = getCurrentInstance();
    console.log(toRaw(currentInstance.ctx.$refs));
    // console.log(JSON.parse(JSON.stringify(currentInstance.ctx.$refs)));

})
//测试样例
const contents = reactive([
    {
        date: "2020/8/14",
        id: 1,
        description: "完成todoList1",
    },
    {
        date: "2020/8/15",
        id: 2,
        description: "完成todoList2",
    },
    {
        date: "2020/8/15",
        id: 3,
        description: "完成todoList3",
    },
    {
        date: "2020/8/15",
        id: 4,
        description: "完成todoList4",
    },
    // {
    //     date: "2020/8/15",
    //     id: 5,
    //     description: "完成todoList5",
    // },
    // {
    //     date: "2020/8/15",
    //     id: "6",
    //     description: "完成todoList6",
    // },
]);

// 新增数据时，聚焦到新的输入框
const onFocus = (number) => {
    // console.log("focus");
    const descriptionInputNumber = `descriptionInput${number}`;
    console.log(descriptionInputNumber);
    console.log(toRaw(currentInstance.ctx.$refs)[descriptionInputNumber][0]);
    toRaw(currentInstance.ctx.$refs)[descriptionInputNumber][0].focus({
        cursor: 'all'
    });
    // console.log(e);
}

// 点击按钮新增数据，此处异步，为了让数组更新后才聚集新输入框
const addTodo = async () => {
    const newIndex = contents.length + 1;
    await contents.splice(newIndex, 0, { data: "", id: newIndex, description: "", });
    // console.log(contents);
    onFocus(newIndex);
}
// 点击按钮删除数据
const deleteTodo = () => {
    const newIndex = contents.length - 1;
    contents.splice(newIndex, 1); // 删除最后的一个数据
    console.log(contents);
    // onFocus(newIndex);
}
const dateSort = (type) => {
    console.log(type);
    if (type === "up") {
        contents.sort((a, b) => a.date.localeCompare(b.date));
        console.log(contents);
    }
    else if (type === "down") {
        contents.sort((a, b) => b.date.localeCompare(a.date));
        console.log(contents);
    }
}
</script>

<style  lang="scss" >
@import './todoList.scss';
</style>