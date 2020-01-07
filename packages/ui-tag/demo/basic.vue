<template>
  <div class="page-demo">
    <demo-block title="基础用法">
      <tm-tag>标签</tm-tag>
      <tm-tag type="primary">标签</tm-tag>
      <tm-tag type="success">标签</tm-tag>
      <tm-tag type="danger">标签</tm-tag>
      <tm-tag type="warning">标签</tm-tag>
    </demo-block>

    <demo-block title="圆角样式">
      <tm-tag round>标签</tm-tag>
      <tm-tag type="primary" round>标签</tm-tag>
      <tm-tag type="success" round>标签</tm-tag>
      <tm-tag type="danger" round>标签</tm-tag>
      <tm-tag type="warning" round>标签</tm-tag>
    </demo-block>

    <demo-block title="空心样式">
      <tm-tag plain>标签</tm-tag>
      <tm-tag type="primary" plain>标签</tm-tag>
      <tm-tag type="success" plain>标签</tm-tag>
      <tm-tag type="danger" plain>标签</tm-tag>
      <tm-tag type="warning" plain>标签</tm-tag>
    </demo-block>

    <demo-block title="标签大小">
      <tm-tag size="xs">标签</tm-tag>
      <tm-tag size="sm">标签</tm-tag>
      <tm-tag size="md">标签</tm-tag>
    </demo-block>
  </div>
</template>

<style lang="scss">
.page-demo {
  .tm-tag + .tm-tag {
    margin-left: 8px;
  }
}
</style>
