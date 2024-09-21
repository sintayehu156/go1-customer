<template>
  <ListView
  class="h-[150px]"
  :columns="[
    {
      label: 'Name',
      key: 'name',
      width: 3,
      getLabel: ({ row }) => row.name,
      prefix: ({ row }) => {
            return h(Avatar, {
              shape: "circle",
              image: row.user_image,
              size: "sm"
            });
          },
    },
    {
      label: 'Email',
      key: 'email',
      width: '200px',
    },
    {
      label: 'Role',
      key: 'role',
    },
    {
      label: 'Status',
      key: 'status',
    },
  ]"
  :rows="[
    {
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
      status: 'Active',
      role: 'Developer',
      user_image: 'https://avatars.githubusercontent.com/u/499550',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@doe.com',
      status: 'Inactive',
      role: 'HR',
      user_image: 'https://avatars.githubusercontent.com/u/499120',
    },
  ]"
  :options="{
    getRowRoute: (row) => ({ name: "User", params: { userId: row.id } }),
    selectable: true,
    showTooltip: true,
    resizeColumn: true,
  }"
  row-key="id"
/>
</template>
<style scoped>
import 
</style>