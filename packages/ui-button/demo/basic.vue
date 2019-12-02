<template>
<div class="page-demo">
    <demo-block title="按钮类型">
        <tm-button>默认按钮</tm-button>
        <tm-button type="primary">主要按钮</tm-button>
        <tm-button type="info">信息按钮</tm-button>
        <div class="spacing"></div>
        <tm-button type="danger">危险按钮</tm-button>
        <tm-button type="warning">警告按钮</tm-button>
    </demo-block>

    <demo-block title="朴素按钮">
      <tm-button plain type="primary" text="朴素按钮" />
      <tm-button plain type="info" text="朴素按钮" />
    </demo-block>

    <demo-block title="禁用状态">
      <tm-button disabled type="primary" text="禁用状态" />
      <tm-button disabled type="info" text="禁用状态" />
    </demo-block>

    <demo-block title="加载状态">
      <tm-button loading type="primary" />
      <tm-button loading loading-text="加载中..." type="info" />
    </demo-block>

    <demo-block title="按钮形状">
      <tm-button type="primary" shape="square" text="方形按钮" />
      <tm-button type="info" shape="round" text="圆形按钮" />
    </demo-block>

    <demo-block title="图标按钮">
      <tm-button type="primary" icon="help" />
      <tm-button plain type="primary" icon="help" text="按钮" />
    </demo-block>

    <demo-block title="按钮尺寸">
      <tm-button type="primary" size="large">大号按钮</tm-button>
      <div class="spacing"></div>
      <tm-button type="primary" size="normal">普通按钮</tm-button>
      <tm-button type="primary" size="small">小型按钮</tm-button>
      <tm-button type="primary" size="mini">迷你按钮</tm-button>
    </demo-block>
</div>
</template>
