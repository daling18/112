<template>
<div class="bdmap-view">
	<div id="l-map"></div>
	<div id="r-result">
		<!-- <el-input id="suggestId" v-model="bdmapKey" style="width:150px;" ></el-input> -->
		<input type="text" id="suggestId" size="20" value="" style="width:150px;" />
	</div>
	<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none; z-index:9999"></div>
</div>
</template>
<script>
	function G(id) {
		return document.getElementById(id);
	}
	
	export default {
		name: 'BdMap',
		data() {
			return {
				defaultPoint: {
					lng: 116.400244,
					lat: 39.92556
				}
			}
		},
		props:{
			point:{
				type: Object
			}
		},
		components:{
		},
		watch:{
			'value':{
				handler(value){
					this.$set(this,'isForm',this.value);
					this.initMapBuild();
				},
				deep:true
			}
		},
		methods: {
			initMapBuild(){
				let _vm = this,
						map = new BMap.Map("l-map"),
						point = new BMap.Point(this.point.lng || this.defaultPoint.lng, this.point.lat || this.defaultPoint.lat),
						marker = new BMap.Marker(point),
						label = new BMap.Label(`经度：${ this.point.lng || this.defaultPoint.lng },纬度：${ this.point.lat || this.defaultPoint.lat }`,{offset:new BMap.Size(20,-15)}),
						top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}),// 左上角，添加比例尺
						top_left_navigation = new BMap.NavigationControl(),  //左上角，添加默认缩放平移控件
						top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}),
						ac = new BMap.Autocomplete({
							"input" : "suggestId"
							,"location" : map
						}),
						searchPoint;
				
				map.centerAndZoom(point, 15);
				map.addControl(top_left_control);        
				map.addControl(top_left_navigation);     
				map.addControl(top_right_navigation);
				map.addOverlay(marker); // 将标注添加到地图中
				marker.setLabel(label);
				map.addEventListener("click", function(e){
					let { lng, lat } = e.point;
					map.clearOverlays();
					marker = new BMap.Marker(new BMap.Point(lng,lat));
					map.addOverlay(marker);
					label.content = `经度：${ lng },纬度：${ lat }`;
					marker.setLabel(label);
					_vm.$emit('update:point', {
						lng: lng + '',
						lat: lat + ''
					});
				}); 

				ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
					var _value = e.item.value;
					searchPoint = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					setPlace();
				});

				function setPlace(){
					map.clearOverlays();    //清除地图上所有覆盖物
					function myFun(){
						var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
						map.centerAndZoom(pp, 15);
						marker = new BMap.Marker(pp);
						map.addOverlay(marker);    //添加标注
						label.content = `经度：${ pp.lng },纬度：${ pp.lat }`;
						marker.setLabel(label);
						_vm.$emit('update:point', {
							lng: pp.lng + '',
							lat: pp.lat + ''
						});
					}
					var local = new BMap.LocalSearch(map, { //智能搜索
						onSearchComplete: myFun
					});
					local.search(searchPoint);
				}   
			}
		},
		mounted() {
			this.$emit('update:point', {
				lng: this.point.lng || this.defaultPoint.lng,
				lat: this.point.lat || this.defaultPoint.lat
			});
			this.initMapBuild();
		}
	};
</script>
<style lang="less">
.bdmap-view{
	position: relative;
	#l-map{height:300px;width:100%;}
	#r-result{width:50%;
		position: absolute;
		top: 20px;
		left: 180px;
	}
	#suggestId{
		width: 150px;
		height: 20px;
		padding: 2px 5px;
		border: 1px solid #ddd;
		outline: none;
	}
}
.tangram-suggestion-main{
		height: 300px;
		overflow: auto;
		z-index: 9999;
	}
</style>
