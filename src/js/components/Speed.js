export default class Speed {

  constructor(resetCallback){
    this.resetCallback = resetCallback
    this.count = 0
    this.timeStamp = 0
    this.oldTimeStamp = 0
    this.firstTimeStamp = 0
    this.avg = 0
    this.ms = 0
    this.timeout = null
    this.reset = this.reset.bind(this)
  }


  tap(){

    if (this.timeout !== null){
      clearTimeout(this.timeout)
      this.timeout = null
    }


    this.timeStamp = performance.now()


    if (this.firstTimeStamp === 0){
      this.firstTimeStamp = this.timeStamp
    }

    if (this.oldTimeStamp !== 0){
      const ms = this.timeStamp - this.oldTimeStamp
      const avg = 60000 * this.count / (this.timeStamp - this.firstTimeStamp)
      this.avg = avg
      this.ms = ms
    }

    this.count = ++this.count

    //store old timestamp
    this.oldTimeStamp = this.timeStamp


    //add timeout back
    this.timeout = setTimeout(this.reset, 4000)

    return {
      count: this.count,
      avg: this.avg
    }
  }

  reset(){
    this.count = 0
    this.timeStamp = 0
    this.oldTimeStamp = 0
    this.firstTimeStamp = 0
    this.avg = 0
    this.ms = 0

    this.resetCallback()
  }
}
