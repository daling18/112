# bom

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# 发布构建
yarn deploy

# 测试构建
yarn deploy:test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


>项目使用单文件组件方式开发

### 目录结构 
> 1. [组件名使用两个及以上单词组成](https://cn.vuejs.org/v2/style-guide/#组件文件-强烈推荐) 
> 2. 文件名统一使用单词大写开头 (驼峰写法)
> 3. 文件名和组件的name保持一致
> 4. 页面的子组件使用父组件名作为文件的前缀（方便检索，关系清晰）
> 5. 通用组件保存在plugins目录下
> 6. pages 和 views 目录存放页面入口文件，views 存放ui改版后的文件

```
// 目录：
  src
    |- components
        |- module1
            |- UserList.vue
            |- UserListItem.vue
        |- module2
    |- plugins
        |- AreaSelect.vue
    |- pages
    |- views
      
// 文件：UserList.vue
<template></template>
<script>
export default {
  name: 'UserList',
  date() {
    return {}
  }
}
</script>
<style></style>
```

### 模板

> 1. [v-for使用，必须设置键值key, 键值内容为字符串或数值](https://cn.vuejs.org/v2/style-guide/#为-v-for-设置键值-必要) <br/> 
> 2. [使用自闭组件(<Comp />)](https://cn.vuejs.org/v2/style-guide/#自闭合组件-强烈推荐)
> 3. 使用两个空格缩进
> 4. 组件有较多声明属性时通过多行撰写，最后的结束符独立一行
> 5. 组件属性使用双引号包裹，
> 6. 指令使用简写的方式: v-bind:attr => :attr, v-on:event => @event


```
<template>
  <div>
    <UserListItem v-for="user in userList" :key="user.id" :data="user"/>
    <div>Women:</div>
    <UserListItem 
      v-for="user in women" 
      :key="user.id" 
      :date="user"
      :showExtra="true"
      @click="console.log('click')"
    />
  </div>
</template>
<script>
import UserListItem form './UserListItem.vue'
export default {
  name: 'UserList',
  components: {
    UserListItem  
  },
  date() {
    return {
      UserList: []
    }
  },
  computed: {
    women: function(){
      return this.userList.filter(user => user.sex == 0);
    }
  }
}
</script>
```

##### 推荐、注意

> [推荐元素属性的顺序](https://cn.vuejs.org/v2/style-guide/#元素特性的顺序-推荐) <br>
> [一组v-if, v-else种，如果元素类型一致建议使用key](https://cn.vuejs.org/v2/style-guide/#没有在-v-if-v-if-else-v-else-中使用-key-谨慎使用)

### 组件代码

> 1. [data 必须是一个函数](https://cn.vuejs.org/v2/style-guide/#组件数据-必要) 
> 2. [Prop 定义应该尽量详细](https://cn.vuejs.org/v2/style-guide/#Prop-定义-必要)
> 3. 代码使用两个空格缩进
> 4. data, prop 属性名使用驼峰写法
> 5. 对于页面需要运算的内容，建议通过computed和filter进行
> 6. 

```
<template>
  <div>
    用户类型： {userType | covertUserType}
    <UserListItem v-for="user in adultList" :key="user.id" :data="user"/>
  </div>
</template>
<script>
import UserListItem form './UserListItem.vue'
export default {
  name: 'UserList',
  filter: {
    convertUserType(val){
      return val == 1 ? '成人' : '儿童';
    }
  },
  props: {
    type: String,
    // 更好的做法！
    status: {
      type: String,
      required: true,
      validator: function (value) {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      },
      default: ''
    }
  },
  components: {
    UserListItem  
  },
  date() {
    return {
      userType: 1,
      UserList: []
    }
  },
  computed: {
    adultList(){
      return this.userList.filter(user => user.type == this.userType);
    }
  }
}
</script>
```

> [在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突](https://cn.vuejs.org/v2/style-guide/#私有属性名-必要)

```
var myGreatMixin = {
  methods: {
    $_myGreatMixin_update() {
      // ...
    }
  }
}
```

##### 推荐、注意
> [组件/实例的选项顺序](https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐) <br>
> [避免使用this.$parent进行父子通讯](https://cn.vuejs.org/v2/style-guide/#隐性的父子组件通信-谨慎使用)


### 样式
> 1. [优先为组件样式设置作用域](https://cn.vuejs.org/v2/style-guide/#为组件样式设置作用域-必要)
> 2. [避免使用元素选择器](https://cn.vuejs.org/v2/style-guide/#scoped-中的元素选择器-谨慎使用)

```
<style scoped>
</style>

// 不使用作用域时注意样式的命名，避免冲突
// 对于组件库，更倾向于选用基于 class，覆写内部样式更容易
<style lang="less">
.my_sytle_wapper{
  .btn{
    margin-left: 5px;
  }
}
</style>
```

### eslint 代码格式检测
1. [eslint-plugin-vue 规则说明](https://github.com/vuejs/eslint-plugin-vue#base-rules-enabling-correct-eslint-parsing)
2. [eslint 规则说明](https://eslint.org/docs/rules/)

> 执行验证

```
// package.json 配置
// 检测并更新src下vue,js后缀的文件
script: {
    "lint": "eslint src --ext vue,js --fix"
}

// 依赖
npm install eslint eslint-plugin-vue --save-dev

// cmd:
npm run lint 
```

> 取消验证注释

```
// 添加注释后，注释之后的内容将都不进行验证，如需验证通过enable启用

<template>
    <!-- eslint-disable -->
    <!-- eslint-enable -->
</template>
<script>
/* eslint-disable */
/* eslint-enable */

// 取消当前行
alert('aa'); // eslint-disable-line

// 取消当前的无弹出框验证
alert('aa'); // eslint-disable-line no-alert

// 仅取消下一行
// eslint-disable-next-line
alert('aa');
</script>
```


> 配置文件 .eslintrc.js
```
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    "extends": "plugin:vue/recommended",
    "rules": {
        "indent": [
            "off",
            2
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "off",
            "always"
        ],
        "vue/max-attributes-per-line":["error", {
            // 设置单行便签支持最多的属性数
            "singleline": 4,
            "multiline": {
                // 设置多行，每行支持的属性数
                "max": 1,
                // 第一行是否支持填写属性
                "allowFirstLine": true
            }
        }],
        // 组件名称使用驼峰写法MyComponent
        "vue/name-property-casing": ["error", "PascalCase"],
        "vue/order-in-components": ["warn"],
        // 空标签使用自闭和写法 
        // "vue/html-self-closing": ["error", "always"],
        // 大括号表达式前后是否添加空格{{}}
        // "vue/mustache-interpolation-spacing": ["error", "always|never"],
    }
};
```



## el-Load
```
<!-- 上传启动开启 -->
onProgress () {
  this.loadingInstance = Loading.service();
},

<!-- 关闭 -->
this.loadingInstance.close()
```


* [更多阅读 vue风格指南](https://cn.vuejs.org/v2/style-guide/)