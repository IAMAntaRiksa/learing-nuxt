<template>
    <div class="container">
        <div class="row justify-content-center">

            <Nuxt />

        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>
