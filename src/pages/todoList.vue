<template>
    <div class="counter">
        <div class="mainPage">
            <div class="navBar">
                <div class="dateBar">
                    待办截止日期
                    <div class="dateIcons">
                        <Icon class="dateIconUp" type="md-arrow-dropup" @click="dateSort('up')" />
                        <Icon class="dateIconDown" type="md-arrow-dropdown" @click="dateSort('down')" />
                    </div>
                </div>
                <div class="todoId">待办序号</div>
                <div class="descriptionBar">待办描述</div>
                <div class="operationBar">待办删除</div>
            </div>
            <!-- 展示搜索项 -->
            <div v-if="isSearching" class="content">
                <div :class="'content' + (index + 1)"
                    v-for="(content, index) in searchContents.slice(6 * (pageCurrnet - 1), 6 * pageCurrnet)"
                    :key="(index + 1)">
                    <DatePicker :class="'content' + (index + 1) + 'date'" :border="false" @on-focus="onFocus"
                        :style="{ 'width': '20vw', 'text -align': 'center' }" :model-value="content.date"
                        placeholder="请选择截止日期" @on-change="(time) => { dateChange(time, content.id) }">
                    </DatePicker>
                    <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px" /> -->
                    <div :class="'content' + (index + 1) + 'id'" :style="{ 'width': '10vw' }">
                        {{ content.id }}
                    </div>
                    <Input :class="'content' + (index + 1) + 'description'" :ref="'descriptionInput' + (index + 1)"
                        :style="{ 'width': '35vw', 'text-align': 'center' }" :border="false"
                        v-model="content.description">
                    </Input>
                    <div :class="'content' + (index + 1) + 'operation'"
                        :style="{ 'width': '15vw', 'text-align': 'center' }">
                        <!-- <Checkbox v-model="content.checked" @on-change="chooseId((index + 1))" label=""> -->
                        <Checkbox v-model="content.checked" label="">
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div v-else class="content">
                <div :class="'content' + (index + 1)"
                    v-for="(content, index) in contents.slice(6 * (pageCurrnet - 1), 6 * pageCurrnet)"
                    :key="(index + 1)">
                    <DatePicker :class="'content' + (index + 1) + 'date'" :border="false" @on-focus="onFocus"
                        :style="{ 'width': '20vw', 'text -align': 'center' }" :model-value="content.date"
                        placeholder="请选择截止日期" @on-change="(time) => { dateChange(time, content.id) }">
                    </DatePicker>
                    <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px" /> -->
                    <div :class="'content' + (index + 1) + 'id'" :style="{ 'width': '10vw' }">
                        {{ content.id }}
                    </div>
                    <Input :class="'content' + (index + 1) + 'description'" :ref="'descriptionInput' + (index + 1)"
                        :style="{ 'width': '35vw', 'text-align': 'center' }" :border="false"
                        v-model="content.description">
                    </Input>
                    <div :class="'content' + (index + 1) + 'operation'"
                        :style="{ 'width': '15vw', 'text-align': 'center' }">
                        <!-- <Checkbox v-model="content.checked" @on-change="chooseId((index + 1))" label=""> -->
                        <Checkbox v-model="content.checked" label="">
                        </Checkbox>
                    </div>
                </div>
            </div>

            <div class="bottomBar">
                <Page class="pagination" size="small" simple :total="pageAmount" :page-size="6"
                    :model-value="pageCurrnet" @on-change="changePage">
                    Pagination
                </Page>
                <Input search class="search" placeholder="Search" @on-search="value => { onSearch(value) }">
                <!-- <template #suffix>
                    <Icon type="ios-search" />
                </template> -->
                </Input>
                <Button :disabled="isSearching" class="add" @click="addTodo">新建+</Button>
                <Button class="delete" @click="deleteTodo">删除-</Button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { toRaw } from '@vue/reactivity';
import { reactive, ref, watch } from 'vue';
import { Button, Input, Icon, DatePicker, Page, Checkbox } from 'view-ui-plus';
let currentInstance = '';
onMounted(() => {
    currentInstance = getCurrentInstance();
    pageAmount.value = contents.length;
    newAddId.value = contents.length;
    // console.log(toRaw(currentInstance.ctx.$refs));
    // console.log(JSON.parse(JSON.stringify(currentInstance.ctx.$refs)));

})
const pageAmount = ref(0); //数据总数
const pageCurrnet = ref(1); // 当前所在页码
const newAddId = ref(0); // 新增事项时ID
const searchContents = reactive([]);  // 搜索对应的数据
const isSearching = ref(false); // 判断是否为搜索状态
const searchVal = ref(""); // 保存当前搜索数据
//测试样例
const contents = reactive(
    [
        {
            date: "2022-8-14",
            id: 1,
            description: "丹丹宝宝",
            checked: false,
        },
        {
            date: "2022-8-15",
            id: 2,
            description: "杰杰宝贝",
            checked: false,

        },
        {
            date: "2022-8-15",
            id: 3,
            description: "亲亲",
            checked: false,

        },
        {
            date: "2022-8-15",
            id: 4,
            description: "抱抱",
            checked: false,

        },
        {
            date: "2020-8-15",
            id: 5,
            description: "亲亲抱抱",
            checked: false,
        },
        {
            date: "2020-8-15",
            id: 6,
            description: "湖南文理学院",
            checked: false,

        },
        {
            date: "2021-8-17",
            id: 7,
            description: "杰宝大帅哥",
            checked: false,

        },
        {
            date: "2022-9-15",
            id: 8,
            description: "摸摸猪头",
            checked: false,

        },
    ]
);

// 新增数据时，聚焦到新的输入框
const onFocus = (number) => {
    const descriptionInputNumber = `descriptionInput${number}`;
    // console.log(descriptionInputNumber);
    // console.log(toRaw(currentInstance.ctx.$refs)[descriptionInputNumber][0]);
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
//日期选择函数
const dateChange = (time, id) => {
    // console.log(time);
    contents.forEach((item, index) => {
        if (item.id === id) {
            contents[index].date = time;
        }
    })
}
// 点击按钮新增数据，此处异步，为了让数组更新后才聚集新输入框
const addTodo = async () => {
    const newIndex = contents.length;
    changePage(parseInt(newIndex / 6) + 1);
    // console.log(newIndex);
    const todayDate = formatDate(new Date());
    // console.log(todayDate);
    await contents.splice(newIndex, 0, { date: todayDate, id: newAddId.value + 1, description: "", checked: false, });
    // console.log(contents);
    newAddId.value = newAddId.value + 1;
    onFocus((newIndex + 1) % 6 ? (newIndex + 1) % 6 : 6);
}
// 点击按钮删除数据
const deleteTodo = () => {
    contents.splice(0, contents.length, ...contents.filter((item, index) => {
        // console.log(item, index);
        if (item.checked === false) {
            // contents.splice(index, 1);
            return true;
        }
    }))
}
// 日期排序函数
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
// 页面跳转函数
const changePage = (current) => {
    // console.log("当前页码为", current);
    pageCurrnet.value = current;
}
// 页面搜索函数
const onSearch = (val) => {
    console.log("搜索项：", val);
    searchVal.value = val;
    val ? isSearching.value = true : isSearching.value = false; // 判断是否为搜索状态
    searchContents.splice(0, searchContents.length, ...contents.filter((item, index) => {
        // console.log(item, index);
        if (item.description.indexOf(val) !== -1) {
            return true;
        }
    }))
    // console.log(searchContents);
}

// 页面页数监听
watch(
    [() => contents.length, () => searchContents.length],
    ([length, searchlength], [prevLength, prevSearchlength]) => {
        // console.log(length, prevLength);
        // console.log(searchlength, prevSearchlength);
        isSearching.value === true ? pageAmount.value = searchlength : pageAmount.value = length;
    }
)
//页面搜索监听(页面原数据更新时，搜索数据同步更新)
watch(
    contents, (contents, prevContents) => {
        if (isSearching.value === true) {
            onSearch(searchVal.value);
        }
    }
)
// 选择删除项，已废弃
// const chooseId = (id) => {
//     console.log("选中删除", id);
// }
</script>

<style  lang="scss" >
@import './todoList.scss';
</style>