<template>
  <div>
    <div class="user-card-wrapper list-group-item">
      <p class="text-capitalize">{{ user.name }} {{ user.lastname }}</p>
      <p>{{ user.department }}</p>
      <p>{{ user.role }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {},
    listType: Boolean,
  }
}
</script>

<style scoped>
.user-card-wrapper {

}
</style>