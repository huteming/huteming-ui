import { Vue, Prop, Watch } from 'vue-property-decorator'
import { createBEM, DescribedComponent } from 'packages/ui-styles/src/main'
import { toTimestamp } from 'packages/ui-tools/src/main'
const bem = createBEM('clocker')

@DescribedComponent({
  name: 'Clocker',
})
export default class Clocker extends Vue {
  render () {
    const DomContent = this.$scopedSlots.default && this.$scopedSlots.default({
      milliseconds: this.milliseconds,
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    })
    return (
      <div class={ bem() }>
        { DomContent }
      </div>
    )
  }

  created () {
    this.start()
  }

  beforeDestroy () {
    clearInterval(this.timer)
  }

  get normalizedEndTime () {
    return toTimestamp(this.endTime, 0)
  }
  get milliseconds () {
    const residue = this.normalizedEndTime - this.currentTime

    return residue <= 0 ? 0 : residue
  }
  get days () {
    return Math.floor(this.milliseconds / (24 * 3600 * 1000))
  }
  get hours () {
    return Math.floor(this.milliseconds / (3600 * 1000)) % 24
  }
  get minutes () {
    return Math.floor(this.milliseconds / (60 * 1000)) % 60
  }
  get seconds () {
    return Math.ceil(this.milliseconds / 1000) % 60
  }

  stop () {
    clearInterval(this.timer)
    this.$emit('end')
  }

  @Watch('startTime')
  @Watch('normalizedEndTime')
  start () {
    if (!this.normalizedEndTime) return

    this.currentTime = toTimestamp(this.startTime, Date.now())

    // 现在时间 已经超过 结束时间
    if (this.milliseconds <= 0) {
      this.stop()
      return
    }

    clearInterval(this.timer)

    this.timer = setInterval(() => {
      this.currentTime += 1000

      if (this.normalizedEndTime <= this.currentTime) {
        this.stop()
      }
    }, 1000)
  }

  @Prop({ type: [String, Number, Date], default: () => 0 })
  startTime!: string | number | Date

  @Prop({ type: [String, Number, Date], default: () => 0 })
  endTime!: string | number | Date

  timer = 0
  currentTime = 0
}
