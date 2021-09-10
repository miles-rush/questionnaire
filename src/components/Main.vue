<template>
	<el-row>
		<el-col :span="12" :offset="6">
			<video playsinline src="" class="myCamera" id="myCamera" ref="myCamera"></video>
		</el-col>
		<el-col :span="12" :offset="6">
			<el-button @click="start">开启摄像头</el-button>
			<el-button @click="close">关闭摄像头</el-button>
		</el-col>
	</el-row>
</template>

<script>
	import RecordRTC from 'recordrtc';
	export default {
		data() {
			return {
				video: null,
				recorder: null,
			}
		},
		mounted() {
			let constraints = {
				audio: true,
				video: {
					width: this.CurrentWidth,
					height: this.CurrentHeight
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
					// this.recorder.startRecording()
				})
				
		},
		methods: {
			start() {
				this.recorder.startRecording()
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
</style>
