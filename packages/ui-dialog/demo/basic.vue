<template>
  <div class="page-demo">
    <div style="height: 30vh;"></div>
    <div class="scrollable">
      <div style="height: 400px;">这里是一个滚动区域</div>
    </div>
    <button @click="visibleDialog = true">open</button>
    <button @click="beforeClose = handleBeforeClose; visibleDialog = true">before close</button>
    <button @click="dialogScroll = true">scroll</button>

    <tm-dialog v-model="visibleDialog" :before-close="beforeClose" @close="handleClose" @closed="handleClosed" close-on-click-modal>
      <img src="./jinghaokefu.png" alt="" class="image" />
    </tm-dialog>

    <tm-dialog v-model="dialogScroll">
      <div class="scrollable">
        <div style="height: 400px; width: 200px; background: #fff;">hello</div>
      </div>
    </tm-dialog>

    <div style="height: 200vh;"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibleDialog: false,
      beforeClose: null,
      dialogScroll: false,
    }
  },

  methods: {
    handleOpen () {
      console.log('open')
    },
    handleClose () {
      console.log('close')
    },
    handleClosed () {
      console.log('closed')
    },
    handleBeforeClose (done) {
      console.log('close 2s later')
      setTimeout(done, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 100px;
    overflow: auto;
}

.image {
    display: block;
    width: 6.44rem;
    height: 9.84rem;
    border: none;
}

.scrollable {
    width: 200px;
    height: 200px;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
