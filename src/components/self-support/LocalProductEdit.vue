<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <el-form
          label-width='120px'
          class="info-form">
          <div class="title">基础信息</div>
          <el-form-item
            label='产品来源'>
            <el-select
              v-model="selectSupplier"
              class="width"
              filterable
              remote
              :remote-method="searchCoopSuppliers"
              value-key="id"
              placeholder="输入产品来源供应商名称"
            >
              <el-option v-for="item in supplierList" :key="item.id" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item
            label='商品类型'
            required>
            <el-select
              :disabled="id !== '0'"
              v-model="submitData.type"
              @change="getArtNo"
              class="width"
              filterable>
              <el-option
                v-for="(item, key) in type_lists"
                :label='item.name'
                :value='item.id'
                :key="key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            required
            label='商品名称'>
            <el-input class="width" v-model="submitData.name"></el-input>
          </el-form-item>
          <el-form-item
            v-if="id !== '0'"
            required
            label='商品货号'>
            <el-input class="width" v-model="submitData.art_no" readonly></el-input>
          </el-form-item>
          <el-form-item
            required
            label='商品所在城市'>
            <el-select 
              v-model="city"
              class="width"
              value-key="area_name"
              remote
              filterable
              :remote-method="remoteMethod"
              placeholder="输入城市名称进行选择">
              <el-option v-for="(city, index) in cityList" :key="index" :label="city.area_name" :value="city">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            required
            label='商品图片'>
            <div class="pic-wrap clearfix">
              <div
                class='upload-img'
                v-for="(item, index) in submitData.pic_lists"
                :key='index'>
                <div v-if="item.is_default === 2" class="upload-index">首</div>
                <div v-if="item.is_default === 2" class="upload-index-bg"></div>
                <div v-if='item.is_default === 1' @click="deleteImg(index)" class="upload-close">x</div>
                <div
                  v-if='item.is_default === 1'
                  class="upload-indeximg-btn"
                  @click='becomeIndex(index)'>设为首图</div>
                <a :href="item.sub_pic_url" target="_blank">
                  <img :src="item.sub_pic_url" alt="">
                </a>
              </div>
              <el-button @click="albumType = true" type='primary'>图片库选择</el-button>
              <!-- <el-upload
                v-if="submitData.pic_lists.length <= 5"
                action="/bom/api/selfsupport.localproduct/upload_img"
                :show-file-list="false"
                :on-success="handleUploadImageSuccess">
                <div class="upload-btn"></div>
                <div slot="tip" class="color-gray">原图分辨率最少不能低于480*480，支持jpg，jpeg，gif，png格式2M以内图片</div>
              </el-upload> -->
            </div>
          </el-form-item>
          <el-form-item
            required
            label='商品详情'>
            <vue-editor 
              v-model="submitData.detail" 
              :auto-height="false" 
            />
            <div class="editor-footer tar">{{ submitData.detail.length }}/5000</div>
          </el-form-item>
          <el-form-item
            label='服务保证'>
            <el-input class="width" v-model="submitData.service_guarantees"></el-input>
          </el-form-item>
          <el-form-item
            label='商品关键词'>
            <el-input class="width" v-model="submitData.keys"></el-input>
            <div class="color-gray">商品关键词请用空格分隔；有两个功能，一是可以作为站内关键词查询，在前台搜索框输入关键词后，能够搜索到该商品；二是作为搜索引擎收录使用.</div>
          </el-form-item>
          <el-form-item
            label='商品备注'>
            <el-input v-model="submitData.remark" type='textarea'></el-input>
          </el-form-item>
          <div class="title">商品报价</div>
          <el-form-item
            required
            label='商品规格'>
            <el-input class="width" v-model="product"></el-input>
            <el-button @click="addProduct" type='primary'>添加</el-button>
          </el-form-item>
          <el-table
            :data="submitData.price_lists"
            border
            style="width: 100%">
            <el-table-column
              prop="size_name"
              label="规格"
              width="150px" 
              align='center'>
            </el-table-column>
            <el-table-column
              label='成本价'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.cost_price"/>
              </template>
            </el-table-column>
            <el-table-column
              label='结算价'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.peer_price"/>
              </template>
            </el-table-column>
            <el-table-column
              label='销售价'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.out_price"/>
              </template>
            </el-table-column>
            <el-table-column
              label='挂牌价'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.tagging_price"/>
              </template>
            </el-table-column>
            <el-table-column
              label='商品库存'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <input-number  v-model="scope.row.stock_nums"/>
              </template>
            </el-table-column>
            <el-table-column
              label='SKU编号'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku_no" readonly></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label='是否限购'
              min-width='100'
              align='center'>
              <template slot-scope="scope">
                <div class="xigou-wrap clearfix">
                  <el-checkbox
                    class="box"
                    :true-label='2'
                    :false-label='1'
                    v-model="scope.row.is_limit_buy">
                  </el-checkbox>
                  <input-number 
                    :disabled='scope.row.is_limit_buy === 1 ? true : false'
                    v-model="scope.row.limit_buy_nums"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label='操作'
              width='100px'
              align='center'>
              <template slot-scope="scope">
                <el-button @click="delProduct(scope)" type='text'>删除</el-button>
              </template>
            </el-table-column>
          </el-table> 
        </el-form>
        <div class="submit-buttons">
          <el-button type="primary" @click="productSubmitCreate">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </div>
    </div>
    <album :visible.sync='albumType' :max='5' @imageArray='handleCheckImage' :check='submitData.pic_lists' checkkey='sub_pic_url' idkey='photo_id'></album>
  </div>
</template>
<script>
import {productCreate, getArtNo, productSubmitCreate} from 'src/api/self_support.localproduct'
import {getArea, searchCoopSuppliers} from 'src/api/api'
import html5Editor from 'src/plugins/editor/vue-html5-editor'
import InputNumber from 'src/plugins/InputNumber'
import Album from 'src/plugins/Album'
export default {
  components: {
    'vue-editor': html5Editor,
    InputNumber,
    Album
  },
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '0',
      selectSupplier: {},
      supplierList: [],
      type_lists: [],
      cityList: [],
      city: {},
      product: '',
      submitData: {
        id: 0,
        supplier_org_id: '',
        type: '',
        name: '',
        art_no: '',
        city_ids: '',
        city_names: '',
        pic_lists: [],
        detail: '',
        service_guarantees: '',
        keys: '',
        remark: '',
        price_lists: []
      },
      albumType: false
    }
  },
  methods: {
    productCreate () {
      let params = {
        data: {
          id: this.id
        }
      }
      productCreate({
        params,
        success: (res) =>{
          let result = res.data
          if (result.code === 0) {
            this.type_lists = result.data.type_lists
            this.supplierList = result.data.supplier_org_lists
            result.data.local_product_info.pic_lists.forEach((item, index) => {
              item.photo_id = item.id
            })
            Object.assign(this.submitData, result.data.local_product_info)
            if (this.submitData.type === 0) {
              this.submitData.type = ''
            }
            let obj = {
              city_id: this.submitData.city_ids,
              area_name: this.submitData.city_names
            }
            if (obj.city_id) {
              this.city = obj
              this.cityList.push(obj)
            }
            let supplier = {
              name: this.submitData.supplier_org_name,
              id: this.submitData.supplier_org_id
            }
            this.selectSupplier = supplier
            this.searchCoopSuppliers(this.submitData.supplier_org_name)
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    getArtNo () {
      let params = {
        data: {
          type: this.submitData.type
        }
      }
      getArtNo({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.submitData.art_no = result.data.art_no
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    searchCoopSuppliers (query) {
      if (!query) {
        return false
      }
      let params = {
        data: {
          org_name: query
        }
      }
      searchCoopSuppliers({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.supplierList = result.data
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        let params = {
          data: {
            country_id: 'CHN',
            area_name: query,
            eng_name: '',
            level: '2',
            parent_id: ''
          }
        };
        getArea({
          params,
          success: (res) => {
            let result = res.data;
            if (result.code === 0) {
                this.cityList = result.data 
            } else {
              this.$message({
                message: result.msg,
                type: 'error'
              });
            };
          },
          showLoading: false
        });
      }
    },
    handleUploadImageSuccess (response, file, fileList) {
      if (response.code === 0) {
        let obj = {
          photo_id: response.data.phote_id,
          sub_pic_url: response.data.pic_url,
          is_default: 1
        }
        if (this.submitData.pic_lists.length === 0) {
          obj.is_default = 2
        }
        this.submitData.pic_lists.push(obj)
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    deleteImg (index) {
      this.submitData.pic_lists.splice(index, 1)
    },
    becomeIndex (index) {
      this.submitData.pic_lists.forEach((item, index) => {
        item.is_default = 1
      })
      this.submitData.pic_lists[index].is_default = 2
    },
    addProduct () {
      let flag = true
      // let sku_no = ''
      // if (this.submitData.art_no === '') {
      //   flag = false
      //   this.$message({
      //     type: 'error',
      //     message: '请选择商品类型'
      //   })
      // } else {
      //   let sku = 0
      //   let lastSku = this.submitData.price_lists.length > 0 ? this.submitData.price_lists[this.submitData.price_lists.length - 1].sku_no : ''
      //   if (lastSku.length > 0) {
      //     sku = parseInt(lastSku.substr(lastSku.length - 2))
      //   }
      //   sku = sku + 1
      //   if (sku < 10) {
      //     sku_no = this.submitData.art_no + '0' + sku
      //   } else {
      //     sku_no = this.submitData.art_no + sku
      //   }
      // }
      this.product = this.product.trim()
      if (this.product === '' && flag) {
        flag = false
        this.$message({
          type: 'error',
          message: '填写商品规格'
        })
      }
      this.submitData.price_lists.forEach((item, index) => {
        if (item.size_name === this.product && flag) {
          this.$message({
            type: 'error',
            message: '规格名称不能重复'
          })
          flag = false
        }
      })
      if (!flag) {
        return false
      }
      let obj = {
        id: 0,
        size_name: this.product,
        cost_price: '',
        peer_price: '',
        out_price: '',
        tagging_price: '',
        stock_nums: '',
        sku_no: '',
        is_limit_buy: 1,
        limit_buy_nums: ''
      }
      this.submitData.price_lists.push(obj)
    },
    delProduct (scope) {
      this.submitData.price_lists.splice(scope.$index, 1)
    },
    handleBack () {
      window.history.go(-1)
    },
    productSubmitCreate () {
      this.submitData.id = this.id
      this.submitData.supplier_org_id = this.selectSupplier.id || ''
      this.submitData.city_ids = this.city.city_id || ''
      this.submitData.city_names = this.city.area_name || ''
      let params = {
        data: this.submitData
      }
      productSubmitCreate({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.handleBack()
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    handleCheckImage (data) {
      this.submitData.pic_lists = []
      this.submitData.pic_lists = data.map((item, index) => {
        let obj = {
          photo_id: item.id,
          id: item.id,
          sub_pic_url: item.sub_pic_url,
          is_default: 1
        }
        if (index === 0) {
          obj.is_default = 2
        }
        return obj
      })
    }
  },
  mounted() {
    this.productCreate()
  },
}
</script>
<style lang="less" scoped>
  .width {
    width: 220px;
  }
  .upload-btn {
    float: left;
    position: relative;
    width: 100px;
    height: 100px;
    background: #ddd;
    &::before {
      content: '';
      position: absolute;
      top: 49px;
      left: 40px;
      width: 20px;
      height: 2px;
      background: #333;
      z-index: 1;
    }
    &::after {
      content: '';
      position: absolute;
      top: 40px;
      left: 49px;
      width: 2px;
      height: 20px;
      background: #333;
      z-index: 1;
    }
  }
  .upload-img {
    float: left;
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin: 0 15px 0 0;
    position: relative;
    .upload-index {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      z-index: 2;
    }
    .upload-index-bg {
      position: absolute;
      top: -25px;
      left: -25px;
      width: 50px;
      height: 50px;
      line-height: 0px;
      background-color: #ff9900;
      transform: rotate(45deg);
      transform-origin: center center;
    }
    .upload-close {
      position: absolute;
      top: 0px;
      right: 0;
      width: 25px;
      height: 25px;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
      line-height: 25px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
    .upload-indeximg-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 5px;
      background: rgba(0, 0, 0, 0.8);
      font-size: 12px;
      line-height: 12px;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .editor-footer{
    margin-top: -28px;
    line-height: 2;
    padding-right: 10px;
  }
  .xigou-wrap {
    position: relative;
    padding: 0 0 0 25px;
    .box {
      position: absolute;
      top: 5px;
      left: 0px;
    }
  }
</style>
