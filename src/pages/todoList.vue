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
                <div :class="'content' + (index + 1)"
                    v-for="(content, index) in contents.slice(6 * (pageCurrnet - 1), 6 * pageCurrnet)"
                    :key="(index + 1)">
                    <DatePicker :class="'content' + (index + 1) + 'date'" :border="false" @on-focus="onFocus"
                        :style="{ 'width': '20vw', 'text -align': 'center' }" :model-value="content.date"
                        placeholder="请选择截止日期">
                    </DatePicker>
                    <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px" /> -->
                    <div :class="'content' + (index + 1) + 'id'" :style="{ 'width': '10vw' }">
                        {{ content.id }}
                    </div>
                    <Input :class="'content' + (index + 1) + 'description'" :ref="'descriptionInput' + (index + 1)"
                        :style="{ 'width': '35vw', 'text-align': 'center' }" :border="false"
                        v-model="content.description">
                    </Input>
                </div>
            </div>
            <div class="bottomBar">
                <Page class="pagination" size="small" simple :total="100" :page-size="6" @on-change="changePage">
                    Pagination
                </Page>
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
import { Button, Input, Icon, DatePicker, Page } from 'view-ui-plus';
let currentInstance = '';
onMounted(() => {
    currentInstance = getCurrentInstance();
    // console.log(toRaw(currentInstance.ctx.$refs));
    // console.log(JSON.parse(JSON.stringify(currentInstance.ctx.$refs)));

})
const pageAmount = ref(10);
const pageCurrnet = ref(1);
//测试样例
const contents = reactive(
    [
        {
            date: "2020-8-14",
            id: 1,
            description: "完成todoList1",
        },
        {
            date: "2020-8-15",
            id: 2,
            description: "完成todoList2",
        },
        {
            date: "2020-8-15",
            id: 3,
            description: "完成todoList3",
        },
        {
            date: "2020-8-15",
            id: 4,
            description: "完成todoList4",
        },
        {
            date: "2020-8-15",
            id: 5,
            description: "完成todoList5",
        },
        {
            date: "2020-8-15",
            id: 6,
            description: "完成todoList6",
        },
        {
            date: "2021-8-17",
            id: 7,
            description: "完成todoList7",
        },
        {
            date: "2022-9-15",
            id: 8,
            description: "完成todoList8",
        },
    ]
);

// 新增数据时，聚焦到新的输入框
const onFocus = (number) => {
    const descriptionInputNumber = `descriptionInput${number}`;
    console.log(descriptionInputNumber);
    console.log(toRaw(currentInstance.ctx.$refs)[descriptionInputNumber][0]);
    toRaw(currentInstance.ctx.$refs)[descriptionInputNumber][0]?.focus({
        cursor: 'end'
    });
}
// 日期格式化函数
const formatDate = (date) => {
    const year = date.getFullYear(); // 获取四位数年份 （yyyy）
    let month = date.getMonth() + 1; // 获取月份（0-11）
    let day = date.getDate(); // 获取日期 （1-31）
    //增加前置 0 
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}
// 点击按钮新增数据，此处异步，为了让数组更新后才聚集新输入框
const addTodo = async () => {
    const newIndex = contents.length;
    // console.log(newIndex);
    const todayDate = formatDate(new Date());
    // console.log(todayDate);
    await contents.splice(newIndex, 0, { date: todayDate, id: newIndex + 1, description: "", });
    // console.log(contents);
    onFocus((newIndex + 1) % 6);
}
// 点击按钮删除数据
const deleteTodo = () => {
    const newIndex = contents.length - 1;
    contents.splice(newIndex, 1); // 删除最后的一个数据
    // console.log(contents);
    // onFocus(newIndex);
}
const dateSort = (type) => {
    // console.log(type);
    // console.log(contents);
    if (type === "up") {
        contents.sort((a, b) => a.date.localeCompare(b.date));
        // console.log(toRaw(contents));

    }
    if (type === "down") {
        contents.sort((c, d) => d.date.localeCompare(c.date));
        // console.log(toRaw(contents));
    }
}
const changePage = (current) => {
    // console.log("当前页码为", current);
    pageCurrnet.value = current;
}
</script>

<style  lang="scss" >
@import './todoList.scss';
</style>