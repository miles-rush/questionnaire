<template>
	<div id="form-outer">
		<el-card shadow="hover" class="box-card">
		  <template #header shadow="hover">
		    <div class="card-header">
		      <span>问卷系统</span>
		    </div>
		  </template>
		  <el-row v-if="render">
		  	<el-col :span="24" :offset="3" id="area">
				<el-row>
					<el-col :span="6">
						<video playsinline src="" class="myCamera" id="myCamera" ref="myCamera"></video>
					</el-col>
					<el-col :span="6" :offset="6">
						<el-descriptions border column="1" title="用户信息" size="medium" style="margin-top: 5px;">
						  <el-descriptions-item label="姓名">田野</el-descriptions-item>
						  <el-descriptions-item label="性别">男</el-descriptions-item>
						  <el-descriptions-item label="年龄">15</el-descriptions-item>
						</el-descriptions>
					</el-col>
					
				</el-row>
		  	</el-col>
			
			<el-col :span="24" :offset="0" v-if="isStart" style="margin-top: 20px;box-shadow: #42B983;">
				<div style="text-align: center;">
					<!-- <el-input
					  type="textarea"
					  size="medium"
					  
					  :autosize="{ minRows: 2, maxRows: 4}"
					  v-model="nowQt"
					  disabled=""
					>
					</el-input> -->
					<text id="question" style="height: 100px;width: 450px;">{{ qList[nowq] }}</text>
					<!-- <textarea disabled="disabled" readonly id="question" style="height: 100px;width: 450px;">{{ qList[nowq] }}</textarea> -->
				</div>
			</el-col>
			
		  	<el-col :span="12" :offset="9">
		  		<el-button v-if="!isStart" type="primary" round @click="start" style="margin-top: 40px;margin-left: 45px;">开 始 问 卷</el-button>
		  		<el-button v-if="isStart" type="success" round style="margin-top: 40px;margin-right: 80px;" @click="yes()">是</el-button>
				<el-button v-if="isStart" type="danger" round style="margin-top: 40px;" @click="no()">否</el-button>
		  	</el-col>
			
			<el-row>
				<el-col :offset="14" style="margin-top: 20px;">
					   <div>
						  <el-divider>注意事项</el-divider>
					      <span>1.全程请保持脸部正对摄像头</span>
					      <el-divider></el-divider>
					      <span>2.每道题目只有一次选择机会</span>
						  <el-divider></el-divider>
						  <span>3.完成所有问卷内容后自动提交，请不要立马关闭浏览器</span>
						  <el-divider>祝你好运</el-divider>
					    </div>
				</el-col>
			</el-row>
		  </el-row>
		  
		</el-card>
		
	</div>
	
	
</template>

<script>
	import RecordRTC from 'recordrtc';
	export default {
		data() {
			return {
				video: null,
				recorder: null,
				// 是否开始录制
				isStart: false,
				height: null,
				render: true,
				// 当前题目下标
				nowq: 0,
				nowQt: '',
				// 题目数组
				qList:[
					'1.你有没有一段时间几乎每天的大部分时间都感到忧郁或情绪低落？',
					'2.是否感到自己的精力下降、活动减慢？',
					'3.是否容易哭泣？',
					'4.是否感到孤独？',
					'5.是否感到苦闷？',
					'6.是否对事物不感兴趣？',
					'7.是否经常责怪自己？',
					// 进阶
					'8.您有没有一段时间几乎每天的大部分时间都感到忧郁或情绪低落？',
					'9.对于平日所喜欢的事情，您是否失去了兴趣或愉快感？',
					'10.近来您进食比平时多或者比平时少吗？',
					'11.有没有入睡困难、觉醒频繁、维持睡眠困难、早醒或睡眠过多吗？',
					'12.您是否烦躁不安以至于不能静坐？',
					'12.您是否讲话或行动比平时来得慢？',
					'14.是不是整天觉得疲倦？',
					'15.您是否对自己做过的或没有做过的事情感到有罪？',
					'16.您有思考或集中注意力方面的问题吗？',
					'17.是否事情糟糕得以至于您常常想到死或觉得也许死了更好？您想到过伤害自己吗？',
					'18.事情糟糕得以至于您常常想到死或觉得也许死了更好，这种状态使您难于工作、做家务或与其他人交往吗？',
					'19.事情糟糕得以至于您常常想到死或觉得也许死了更好，这种状态持续有两个星期了吗？'
				],
				// 最后题目的编号
				qMax: 0,
				resultList:[],
				timeList:[]
			}
		},
		mounted() {
			let that = this
			let constraints = {
				audio: true,
				video: {
					width: this.CurrentWidth / 2,
					height: this.CurrentHeight / 2
					// width: { min: 1024, ideal: 1280, max: 1920 },
					// height: { min: 776, ideal: 720, max: 1080 }
				}
			}
			
			navigator.mediaDevices.getUserMedia(constraints)
				.then(mediaStream => {
					console.log('开启摄像头')
					this.video = this.$refs.myCamera
					this.video.srcObject = mediaStream
					this.recorder = RecordRTC(mediaStream)
					this.video.onloadedmetadata = e => {
						this.video.play()
						
					}
					that.$message.success('摄像头开启成功');
					// this.recorder.startRecording()
			})
			
			// 问卷显示部分初始化
			this.nowQt = this.qList[0]
			this.qMax = this.qList.length - 1
		},
		methods: {
			start() {
				
				//document.getElementById('myCamera').style.height = '50%'
				// document.getElementById('area').style.height = '50%'
				
				this.recorder.startRecording()
				this.isStart = true
				// document.getElementById('question').style.marginBottom = '' + this.height +'px'
				that.$message.success('开始问卷内容');
			},
			yes(){
				this.next(1)
			},
			no(){
				this.next(0)
			},
			next(result) {
				if(this.nowq == this.qMax) {
					// 做完了
					this.$message.warning('最后一题');
					return
				}
				// 记录答案
				this.resultList.push(result)
				// 记录时间
				let time = Date.now()
				this.timeList.push(time)
				
				this.nowq = this.nowq + 1
				this.nowQt = this.qList[this.nowq]
				
				console.log('resultList:', this.resultList)
				console.log('timeList:', this.timeList)
			},
			close() {
				this.recorder.stopRecording(() => {
					console.log(this.video.src)
					const downloadLink = document.createElement('a') 
					downloadLink.href = URL.createObjectURL(this.recorder.getBlob())
					// 下面是定义文件名字
					downloadLink.download = `${new Date().getTime()}`
					// 点击a标签
					downloadLink.click()
				})
				
			},
		}
	}
</script>

<style>
.card-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
}
  

html,
body {
  background-color: #a9d7d1;
  /* text-align: center; */
  font-family: 'Raleway', Helvetica, sans-serif;
  min-width: 320px;
}

#form-outer {
  /* background-color: rgb(250, 250, 250); */
  margin: 0 auto;
  border-radius: 4px;
  width: 75%;
  max-width: 900px;
  padding: 10px;
  padding-top: 20px;
}

#question {
	box-shadow: 0 2px 1px 4px rgba(0, 170, 255, 0.1),0 0 6px rgba(0,0,0,0.04);
	box-sizing: border-box;
	font-size: 1.1rem;
	font-weight: 1000;
}
</style>
