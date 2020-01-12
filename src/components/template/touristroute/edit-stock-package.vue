<template>
    <div class="stock-pageage-list">
        <stock-page-form ref="stockForm" v-for="(packages, index) in packageData" :key="packages.id" :show_front="show_front" :index="index" :isDelete="packageData.length > 1" v-model="packageData[index]" @delete="handlePackageDelete" />
    </div>
</template>
<script>
import { searchDeparture } from "src/api/touristroute";
import StockPageForm from "src/components/template/touristroute/stock-package";
const lockType = [1, 2];
export default {
    name: "stockPackage",
    components: {
        StockPageForm
    },
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        show_front: Boolean
    },
    computed: {
        packageData: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("input", newValue);
            }
        }
    },
    methods: {
        createdPriceRow() {
            return {
                type: 0,
                settle_price: "",
                sales_price: "",
                price_desc: "",
                online_price: "",
                other_name: ""
            };
        },
        handlePackageDelete(index) {
            this.packageData.splice(index, 1);
        },
        validate() {
            let validate = this.$refs["stockForm"].map(form => {
                return form.validate();
            });
            return Promise.all(validate).then(res => {
                this.$log.debug(res);
            });
        }
    }
};
</script>

<style lang="scss">
.stock-pageage-list {
    .el-table {
        .el-form-item__content {
            margin-left: 0 !important;
        }
        td {
            height: auto;
            padding: 0;
            .cell {
                max-height: none;
                padding: 20px;
            }
        }
    }
}
</style>