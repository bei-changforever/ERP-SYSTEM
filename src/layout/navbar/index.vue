<script setup lang="ts">
import Hamburger from './components/hamburger.vue';
import Tabs from '../tabs/index.vue';
</script>

<template>
  <div class="navbar-container">
    <div class="navbar-left">
      <Hamburger />
      <Tabs />
    </div>
    <div class="navbar-right">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  height: var(--theme-header-height);
  display: flex;
  align-items: center;
  background: var(--theme-header-bg-color);
  border-bottom: 1px solid var(--theme-border-color-light);
  color: var(--theme-header-text-color);

  ::v-deep(.svg-icon) {
    align-items: center;
    cursor: pointer;
    height: var(--theme-header-height);
    line-height: var(--theme-header-height);
    padding: 0 6px 0 18px;

    svg {
      color: var(--theme-header-text-color) !important;
    }
  }
}

.navbar-left {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}
</style>
