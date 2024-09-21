<template>
    <div>
      <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
        <div class="head-content">
          <header class="border-b bg-white px-5 py-2.5 sm:px-5">
            Shipments
          </header>
        </div>
      </div>
      <div :class="['layout', { collapsed: isSidebarCollapsed }]">
        <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
        <div class="main-content">
          <ListView
          class="h-[500px]"
          :columns="columns"
          :rows="paginatedRows"
            :options="{
              getRowRoute: (row) => ({ name: 'ShipmentDetails', params: { id: row.name } }),
              selectable: true,
              showTooltip: true,
              resizeColumn: true,
              emptyState: {
                title: 'No records found',
              },
            }"
            row-key="name"
            @row-click="OpenClick"
          />
          <pagination :rows="rows" @update:paginatedRows="updatePaginatedRows" /> 
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
  import ListView from '@/components/ListView/ListView.vue'
  import Pagination from '@/components/Pagination.vue'
  import { ref, onMounted } from 'vue'
  import { createResource } from 'frappe-ui'
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      LeftSidebar,
      ListView,
      Pagination
    },
    setup() {
      const isSidebarCollapsed = ref(false)
      const paginatedRows = ref([]) 
      const rows = ref([])
      const columns = ref([
        { label: 'Name', key: 'name', width: '200px' },
        { label: 'Status', key: 'status', width: '200px' },
        { label:'Item', key:'item_name', width:'200px'},
        { label: 'Date', key: 'posting_date', width: '200px' },
        { label: 'Total', key: 'total', width: '200px' },
      ])
  
      const todos = createResource({
        url: 'go1_customer.go1_customer.api.api.get_shipments',
       method:'get',
      })
  
      const fetchquote = async () => {
    try {
      const data = await todos.fetch()
      rows.value = data.map(row => ({
        ...row,
        total: String(row.total),
        item_name: row.items.length > 0 ? row.items[0].item_name : 'No items'
      }))
      console.log('Fetched data:', rows.value)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  
      const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value
      }
  
      const router = useRouter()
  
      const OpenClick = (row) => {
        console.log('Row clicked:', row)
        if (row && row.name) {
          router.push({ name: 'ShipmentDetails', params: { id: row.name } })
        } else {
          console.error('Row data is invalid:', row)
        }
      }
      const updatePaginatedRows = (newPaginatedRows) => {
      paginatedRows.value = newPaginatedRows
    }
      onMounted(() => {
        fetchquote()
      })
  
      return {
        isSidebarCollapsed,
        rows,
        columns,
        toggleSidebar,
        OpenClick,
        updatePaginatedRows,
        paginatedRows

      }
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
    height: 80vh;
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
  