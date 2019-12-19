<template>
  <div class="page-demo">
    <demo-cell :body="valueDatetime | date" @click.native="visibleDatetime = true" link></demo-cell>
    <demo-divider></demo-divider>
    <tm-picker-datetime
      :visible.sync="visibleDatetime"
      v-model="valueDatetime"
      :min-date="minDate"
      :max-date="maxDate">
    </tm-picker-datetime>
  </div>
</template>

<script>
export default {
  data () {
    return {
      minDate: new Date(2015, 5),
      maxDate: new Date(2018, 6, 1),

      valueDatetime: new Date(),
      visibleDatetime: false,

      valueDate: new Date(),
      visibleDate: false,

      valueTime: new Date(),
      visibleTime: false,
    }
  },

  methods: {
    handleDateChange (date) {
      console.log('change date', date)
    },
  },

  filters: {
    date (val) {
      const year = val.getFullYear()
      const month = val.getMonth() + 1
      const date = val.getDate()
      const hour = val.getHours()
      const minute = val.getMinutes()
      return `${year}-${month}-${date} ${hour}:${minute}`
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
    min-height: 100vh;
}

.space {
    margin-bottom: 20px;
}
</style>
