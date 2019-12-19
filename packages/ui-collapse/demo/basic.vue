<template>
<div class="demo">
  <demo-divider>基础用法</demo-divider>

  <tm-collapse v-model="active" @change="handleChange">
    <tm-collapse-item header="title1">
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item header="title2">
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item header="title3">
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>
  </tm-collapse>

  <demo-divider>手风琴</demo-divider>

  <tm-collapse v-model="active2" accordion @change="handleChange">
    <tm-collapse-item name="1" header="title1">
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item name="2" header="title2">
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item name="3" header="title3">
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>
  </tm-collapse>

  <demo-divider>disabled</demo-divider>

  <tm-collapse v-model="active3">
    <tm-collapse-item name="1" header="title1" disabled>
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item name="2" header="title2" disabled>
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item name="3" header="title3" disabled>
      <demo-cell body="hello"></demo-cell>
    </tm-collapse-item>

    <tm-collapse-item name="4" header="子项目为空" @click="handleClick">
    </tm-collapse-item>

    <tm-collapse-item name="5" header="异步" @click="handleClick">
      <demo-cell body="hello" v-if="num > 0"></demo-cell>
    </tm-collapse-item>
  </tm-collapse>

    <!-- <demo-divider>mock</demo-divider>

    <tm-collapse v-model="mockValue">
      <tm-collapse-item v-for="item in mockList" :key="item.name" :name="item.name" :header="item.name" :disabled="item.isLocked" @click="handleMock(item)">
        <demo-cell v-for="child in item.children" :key="child.name" :body="child.name" @click.native="handleMock(child)">
          <TmIcon icon="lock" v-if="child.isLocked" />
        </demo-cell>
      </tm-collapse-item>
    </tm-collapse> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ['4'],
      active2: '',
      active3: ['1'],
      num: 0,

      mockValue: [],
      mockList: [
        {
          name: '1',
          children: [],
        },
        {
          name: '2',
          isLocked: true,
          children: [],
        },
        {
          name: '3',
          children: [
            { name: '3-1' },
            { name: '3-2', isLocked: true },
          ],
        },
      ],
    }
  },

  computed: {
  },

  mounted () {
    // setTimeout(() => {
    //     this.num = 3
    // }, 2000)
  },

  methods: {
    handleMock (item) {
      if (item.children) {
        if (item.children.length) return
        console.log('click parent')
        return
      }
      console.log('click child')
    },
    handleClick (isActive) {
      console.log('isActive', isActive)
      this.num = 3
    },
    handleChange (current) {
      console.log('change to: ', current)
    },
  },
}
</script>
