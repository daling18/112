<template>
  <div class="filter-bar">
    <el-form size="small" label-width="80px" v-model="deriveValue" ref="filterForm">
      <el-form-item
        v-for="item in data"
        :key="item.id"
        :label="item.label"
        :prop="item.id"
        class="filter-row"
      >
        <div class="group" :id="item.id">
          <component :is="container.parent" v-model="deriveValue[item.id]" @change="change">
            <el-tag
              :effect="deriveValue[item.id] | isHighlight(item.data)"
              class="selected-all"
              size="default"
              @click="handleClearSelected(item.id)"
            >全部</el-tag>
            <component
              :is="container.child"
              v-for="ele in item.data"
              :key="ele.id"
              :label="ele.id"
            >{{ele.label}}</component>
            <slot :name="item.id"></slot>
          </component>
          <el-button class="more-button" type="text" @click="handleMoreButton(getDom(item.id))">更多</el-button>
        </div>
      </el-form-item>
      <el-form-item v-if="result.length">
        <template v-for="item in result">
          <el-tag
            v-for="value in item.selected"
            closable
            :key="item.id + value.id"
            @close="handleDeleteSelected(item.id, value.id)"
            size="default"
          >{{value.label}}</el-tag>
        </template>
        <el-button @click="clearSelected">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {on, off, addClass, removeClass, hasClass} from 'src/utils/dom';
// const data = [
//   {
//     label: "产品状态",
//     id: "audit_status",
//     data: [
//       //产品状态
//       {
//         id: 1,
//         label: "未上架"
//       },
//       {
//         id: 2,
//         label: "审核中"
//       },
//       {
//         id: 3,
//         label: "已上架"
//       },
//       {
//         id: 4,
//         label: "已下架"
//       },
//       {
//         id: 5,
//         label: "已退回"
//       },
//       {
//         id: 6,
//         label: "上架失败"
//       }
//     ]
//   },
//   {
//     label: "产品类型",
//     id: "trip_type",
//     data: [
//       {
//         id: 1,
//         label: "跟团游"
//       },
//       {
//         id: 2,
//         label: "邮轮"
//       },
//       {
//         id: 3,
//         label: "商务考察"
//       },
//       {
//         id: 4,
//         label: "自由行"
//       },
//       {
//         id: 5,
//         label: "定制游"
//       },
//       {
//         id: 6,
//         label: "周边游"
//       },
//       {
//         id: 7,
//         label: "落地拼"
//       }
//     ]
//   }
// ];
export default {
  components: {},
  props: {
    data: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      default: {}
    }
  },
  filters: {
    isHighlight(selected, data) {
      if (data.length === selected.length) {
        return "dark";
      }
      if (selected.length === 0) {
        return "dark";
      }
      return "plain";
    }
  },
  data() {
    return {
      maxHeight: 50,
      doms: []
    };
  },
  computed: {
    ids() {
      return Object.keys(this.value);
    },
    deriveValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    result() {
      let result = [];
      if (Object.keys(this.deriveValue).length === 0) {
        return result;
      }
      if (!this.multiple) {
        result = Object.entries(this.deriveValue).map((id, element) => {
          return {
            id,
            selected: [element]
          };
        });
        return result;
      }
      result = Object.entries(this.deriveValue).map(([id, element]) => {
        let selectedItems = this.data.find(item => item.id === id); // 选中项目
        return {
          id,
          selected: selectedItems.data.filter(item => element.includes(item.id)) // 选中值
        };
      });

      return result.filter(item => item.selected.length !== 0);
    },
    container() {
      if (this.multiple) {
        return {
          parent: "ElCheckboxGroup",
          child: "ElCheckboxButton"
        };
      }
      return {
        parent: "ElRadioGroup",
        child: "ElRadioButton"
      };
    }
  },
  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          this.init();
        });
      },
      deep: true
    }
  },
  methods: {
    getDom(id) {
      return document.getElementById(id);
    },
    handleDeleteSelected(itemKey, id) {
      if (!this.multiple) {
        this.deriveValue[itemKey] = "";
        return;
      }
      let result = this.deriveValue[itemKey].filter(item => item != id);
      this.deriveValue[itemKey] = result;
      this.$emit("change");
    },
    clearSelected(formName) {
      let resetValue = {};
      Object.keys(this.deriveValue).forEach(element => {
        resetValue[element] = this.multiple ? [] : "";
      });
      this.deriveValue = Object.assign(this.deriveValue, resetValue);
      this.$nextTick(() => {
        this.$emit("change");
      });
    },
    filterParams(key) {
      for (let i in this.optionsData) {
        if (key == i) {
          return this.optionsData[i].value;
        }
      }
    },
    change(val) {
      this.$emit("change");
    },
    handleClearSelected(id) {
      this.deriveValue[id] = [];
      this.$nextTick(() => {
        this.$emit("change");
      });
    },
    handleMoreButton(dom) {
      const SLIDE_UP = 'slideUp';
      let classList = dom.className.split(" ");
      let button = dom.getElementsByClassName('more-button').item(0);
      if (hasClass(dom, SLIDE_UP)) {
        removeClass(dom, SLIDE_UP);
        button.innerHTML = "展开";
      } else {
        addClass(dom, SLIDE_UP);
        button.innerHTML = "收起";
      }
    },
    renderStyle() {
      const SLIDE = 'slide';
      this.doms.forEach(dom => {
        removeClass(dom, SLIDE);
        const rect = dom.getBoundingClientRect();
        let offsetHeight = rect.height;
        if (offsetHeight > this.maxHeight) {
          addClass(dom, SLIDE);
        }
        // dom.className = classList.join(" ");
      });
    },
    init() {
      this.doms = this.ids.map(id => document.getElementById(id));
      this.renderStyle();
    }
  },
  created() {},
  mounted() {
    on(window, "resize", this.init);
  },
  beforeDestroy() {
    off(window, "resize", this.init);
  },
};
</script>

<style scoped>
>>> .selected-all.el-tag--plain {
  background: #f2f2f2 !important;
}
>>> .el-tag {
  height: 34px;
  line-height: 32px;
  padding: 0 22px;
}
>>> .el-form-item__label {
  color: #000;
}
</style>
<style lang="scss" scoped>
@import "src/assets/css/variables";
.group {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  .more-button {
    display: none;
  }
  &.slide {
    max-height: 44px;
    .more-button {
      display: block;
    }
    &.slideUp {
      max-height: none;
    }
    &.slideDown {
      max-height: 44px;
    }
  }
}

.more {
  
}
.filter-bar {
  padding: 0 20px;
  margin-bottom: 10px;
}
.result-tag {
  border-radius: 0 !important;
  color: $themeColor;
}
.el-form-item {
  margin-bottom: 0;
}
.selected-all {
  vertical-align: bottom;
  border-radius: 0;
  cursor: pointer;
  &.el-tag--plain {
    color: #000;
    background: $gray;
    border-color: transparent;
    &:hover {
      color: $themeColor;
    }
  }
}
.el-tag,
.el-checkbox-button {
  margin-right: 4px;
  margin-bottom: 10px;
  // vertical-align: middle;
}
.el-tag + .el-tag {
  margin-left: 0;
}
</style>
