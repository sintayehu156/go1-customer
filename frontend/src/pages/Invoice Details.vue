<template>
    <div>
      <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
        <div class="head-content">
          <header class="border-b bg-white px-5 py-2.5 sm:px-5">
            <Breadcrumbs :items="breadcrumbsList" class="bg-inherit" />
          </header>
        </div>
      </div>
      <div :class="['layout', { collapsed: isSidebarCollapsed }]">
        <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
        <div class="main-content">
          <div class="flex flex-col gap-2 rounded-md border p-4">
            <div class="p-2 bg-white">
              <div class="truncate text-3xl font-semibold">{{ name }}</div>
              <FormControl
                :type="'text'"
                size="sm"
                variant=""
                placeholder=""
                :disabled="false"
                label="Label"
                v-model="name"
              />
            </div>
            <div class="p-2">
              <FormControl
                :type="'text'"
                size="sm"
                variant="subtle"
                placeholder="Placeholder"
                :disabled="false"
                label="Label"
                v-model="inputValue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue';
  import { ref, onMounted } from 'vue';
  import { createResource, Breadcrumbs, FormControl } from 'frappe-ui';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    components: {
      LeftSidebar,
      Breadcrumbs,
      FormControl,
    },
    setup() {
      const router = useRouter();
      const route = useRoute(); 
  
      const isSidebarCollapsed = ref(false);
      const name = ref('');
      const inputValue = ref('');
  
      const invoices = createResource({
        url: '/api/method/frappe.client.get_list',
        params: {
          doctype: 'Sales Invoice',
          fields: ['*'],
        },
      });
  console.log(invoices)
      const fetchinvoiceDetails = async () => {
        try {
          const id = route.params.id;
          const data = await invoice.fetch();
          const invoiceDetails = data.find(item => item.name === id);
          if (invoiceDetails) {
            name.value = invoiceDetails.name;
            inputValue.value = invoiceDetails.status; 
          }
          console.log('Fetched order details:', invoiceDetails);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
      };
  
      onMounted(() => {
        fetchinvoiceDetails();
      });
  
      return {
        isSidebarCollapsed,
        name,
        inputValue,
        toggleSidebar,
      };
    },
  }
  </script>
  
  <style scoped>
  .head-layout {
    display: flex;
    width: 100%;
    transition: margin-left 0.3s ease;
  }
  .layout {
    display: flex;
    width: 100%;
    height: 100vh;
    transition: margin-left 0.3s ease;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 1.25rem;
    transition: margin-left 0.3s ease;
    margin-left: 220px; /* Default width of sidebar */
  }
  .head-content {
    flex-grow: 1;
    padding: 0px;
    transition: margin-left 0.3s ease;
    margin-left: 220px; /* Default width of sidebar */
  }
  .collapsed .main-content {
    margin-left: 60px; /* Adjust when sidebar is collapsed */
  }
  .collapsed .head-content {
    margin-left: 60px; /* Adjust when sidebar is collapsed */
  }
  .list-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e5e7eb; /* Gray bottom border */
  }
  
  .row:hover {
    background-color: #f9fafb; /* Light gray background on hover */
  }
  </style>
  