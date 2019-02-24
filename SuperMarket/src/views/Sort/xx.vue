<template>
    <div>
        <mt-tab-container v-model="active" swipeable>
                <mt-tab-container-item id="tab-container1">
                    <mt-cell v-for="n in 10" title="tab-container 1" :key="n"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                    <mt-cell v-for="n in 5" title="tab-container 2" :key="n"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container3">
                    <mt-cell v-for="n in 7" title="tab-container 3" :key="n"></mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss">

</style>
