<template>
<div class="wrapper">
	<el-form  ref="resourceForm"
						v-if="form"
						:rules="rules"
						:model="form"
						label-width="100px"
						@submit.prevent="onSubmit"
			style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="景区名称" prop="full_name" required>
			<el-input v-model="form.full_name"></el-input>
		</el-form-item>
		<el-form-item label="所在城市" prop="area_id">
				<zone-dropdown v-model="form.area_id"></zone-dropdown>
		</el-form-item>
		<el-form-item label="景区等级" prop="grade">

			<el-select v-model="form.grade" placeholder="请选择景区等级">
				 <el-option
					v-for="(item,key,index) in gradeOptions"
					:label="item"
					:value="key"
					:key="index">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="景区地址" prop="address">
			<el-input v-model="form.address"></el-input>
		</el-form-item>
		<el-form-item label="景区图片">
			<!--<el-upload
			  action="/api/pic_manage/upload"
			  list-type="picture-card"
			  name="picture"
				:data="{pic_type:2}"
			  :file-list="form.pic_urls"
			  :on-success="uploadSuccess"
			  :on-error="uploadError"
				:before-upload="beforeUpload"
			  :on-remove="handleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>-->
			<el-upload
				class="avatar-uploader"
				action="/api/pic_manage/upload"
				name="picture"
				:data="{pic_type:2}"
				:show-file-list="false"
				:on-success="uploadSuccess"
				:on-remove="handleRemove"
				:before-upload="beforeUpload">
				<img v-if="form.pic_urls" :src="form.pic_urls" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<p class="formtip">仅支持上传1张图片，图片最佳尺寸750px*500px，不超过2M</p>
		</el-form-item>
		<el-form-item label="景区描述" prop="desc_content">
			<html5-editor v-model="form.desc_content"></html5-editor>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('resourceForm')">确定</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>




</div>
</template>

<script>
	import { getResourceInfo,
					 setResourceInfo,
					 resourceActiontype,
					 resourceConfig } from 'src/api/api';
  import zoneDropdown from 'src/plugins/zone-dropdown/zone-dropdown.vue';
  import html5Editor from 'src/plugins/editor/vue-html5-editor.vue';

	export default {
			data() {
				var checkFullName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入景区名称'));
				} else {
					if (!this.$route.query.id) {
						let para = {};
						para.data = {};
						para.data.type = 'is_resoure_used';
						para.data.type_id = this.form.type_id;
						para.data.keyword = this.form.full_name;

						resourceActiontype({
              params: para,
              success: (res) => {
                let judge = parseInt(res.data.res,10);
                if(judge){
                  callback();
                }else{
                  callback(new Error(res.data.msg));
                }
              }
            });
					}else{
						callback();
					}
        }
			};
			return {
				form: null,
				pic_manage:[],
				rules:{
					full_name:{validator: checkFullName, trigger: 'blur' },
					area_id:{required: true, message: '请输入景区地址', trigger: 'blur' },
					grade:{required: true, message: '请选择景区类型', trigger: 'blur' },
					address:{required: true, message: '请填写景区地址', trigger: 'blur' },
					desc_content:{required: true, message: '请填写景区描述', trigger: 'blur' },
				},
				gradeOptions: {},
				editorOption: {
					modules: {
						toolbar: [
							[{ 'size': ['small', false, 'large'] }],
							['bold', 'italic'],
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							['link', 'image']
						],
						history: {
							delay: 1000,
							maxStack: 50,
							userOnly: false
						}
					},
					placeholder:'请填写景区描述'

				}

			}
		},
    components:{
			'zone-dropdown':zoneDropdown,
			'html5-editor':html5Editor
		},
		computed:{

		},
		methods: {
			initFormObj(){
				let form = {
					id: 0,
					type_id:1,			//1:景区  2：酒店
					full_name: '',
					area_id: '',
					grade: '',
					address:'',
					pic_urls: '',
					desc_content:''
				};
				return form;
			},
			initPageFn() {
				// query.id不为空是编辑状态，为空则新增
				if(this.$route.query.id){
					let para = {};
					para.data = {};
					para.data.id = this.$route.query.id;

					getResourceInfo({
            params: para,
            success: (res) => {
              this.form = JSON.parse(JSON.stringify(res.data.data));
            }
          });
				}else{
						this.form=this.initFormObj();
				}
			},
			// 页面提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let para = {};
						para.data = Object.assign({}, this.form);

						setResourceInfo({
              params: para,
              success: (res) => {
                let judge = parseInt(res.data.res,10);
                this.$notify({
                  title: judge?'成功':'失败',
                  message: res.data.msg,
                  type: judge?'success':'error'
                });
                if(res.data.res == 1){
                  this.$router.push({ path:'/resource/jingqu/list'});
                }
              }
            });
					}else{
						 console.log('submit error!')
					}
				});
			},
			// 获取下拉资源类型选项
			getResourceConfig(){
				let para = {};
				para.data = {};
				para.data.type = 1;

				resourceConfig({
          params: para,
          success: (res) => {
            this.gradeOptions = res.data.data;
          }
        });
			},
			//图片上传相关函数
			handleRemove(file, fileList) {
				this.form.pic_urls =fileList;
			},
			uploadSuccess(response, file, fileList){
					this.form.pic_urls = response.msg.pic_url;
	    },
	    uploadError(err, file, fileList){
	     	 console.log(err)
	    },
			beforeUpload(file){
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			}
		},
		mounted() {
			this.initPageFn();
			this.getResourceConfig();
		}
	}

</script>

<style lang="scss">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
