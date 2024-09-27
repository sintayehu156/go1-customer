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
        <LeftSidebar class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" @true="sidebarcol" />
        <div class="main-content">

          <div class="fiter mb-2 flex gap-3">
            <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" />         
            <FormControl type="select"
              :options="[
                {},
                { label: 'Draft',value: 'Draft',}, { label: 'To Bill',value: 'To Bill',}, { label: 'Return Issued',value: 'Return Issued',},
                { label: 'Completed',value: 'Completed',},{ label: 'Cancelled',value: 'Cancelled',}, { label: 'Closed',value: 'Closed',},                              
              ]"
              size="sm" variant="subtle" placeholder="Status" v-model="filterStatus" class="w-52" />
            <TextInput type="search" size="sm" variant="subtle" placeholder="Total" v-model="filterTotal" />
            <DatePicker class="border-none" size="md" variant="subtle" placeholder="Date" v-model="filterDate"/>
            <Button :variant="'subtle'" theme="gray" size="sm" @click="resetFilters"> Reset</Button>
            <div class="flex gap-2">
            <RefreshButton @refresh="reload" :isLoading="isLoading" />
          </div>
          </div>

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
          >
          <template #cell="{ item, column }">
            <div v-if="column.key === 'status'">
              <Badge
                v-bind="getStatusTheme(item)"
                size="sm"
                :label="item"
              />
            </div>
            <div v-else>
              <span class="font-medium text-gray-700 text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">{{ item }}</span>
            </div>
          </template>
          </ListView>
          <pagination :rows="filteredRows" @update:paginatedRows="updatePaginatedRows" /> 
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
  import RefreshButton from '@/components/RefreshButton.vue'
  import ListView from '@/components/ListView/ListView.vue'
  import Pagination from '@/components/Pagination.vue'
  import { ref, onMounted, computed } from 'vue'
  import { createResource,TextInput,FormControl,Badge,DatePicker,Button } from 'frappe-ui'
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      LeftSidebar,
      ListView,
      Pagination,
      TextInput,
      FormControl,
      Badge,DatePicker,
      RefreshButton,Button
    },
    setup() {
      const isSidebarCollapsed = ref(false)
      const paginatedRows = ref([]) 
      const rows = ref([])
      const isLoading = ref(false)
      const columns = ref([
        { label: 'Name', key: 'name', width: '250px' },
        { label: 'Status', key: 'status', width: '200px' },
        { label:'Item', key:'item_name', width:'200px'},
        { label: 'Date', key: 'posting_date', width: '200px' },
        { label: 'Total', key: 'grand_total', width: '200px' },
      ])
  
      const todos = createResource({
        url: 'go1_customer.go1_customer.api.api.get_shipments',
       method:'get',
      })
  
      const shipment = async () => {
    try {
      isLoading.value = true
      const data = await todos.fetch()
      rows.value = data.map(row => ({
        ...row,
        total: String(row.total),
        item_name: row.items.map(item => item.item_name).join(', ') || 'No items',
      }))
      console.log('Fetched data:', rows.value)
    } catch (error) {
      console.error('Error fetching data:', error)
    }finally {
        isLoading.value = false
      }
  }
  
      const reload = () => {
          shipment() 
        }
      const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value
      }
      const sidebarcol = () => {
        console.log("vlaueqwqwqq",)
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

    const resetFilters = () => {
      filterName.value = ''
      filterStatus.value = ''
      filterTotal.value = ''
      filterDate.value = ''
    }

      const filterName = ref('')
      const filterStatus = ref('')
      const filterTotal = ref('')
      const filterDate = ref('')

      const filteredRows = computed(() => {
        return rows.value.filter(row => {
          const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())
          const statusMatch = row.status.toLowerCase().includes(filterStatus.value.toLowerCase()) || !filterStatus.value; 
          const grand_totalMatch = row.grand_total.toString().includes(filterTotal.value.toString()) || !filterTotal.value;
          const reversedDate = filterDate.value.split('-').reverse().join('-'); 
          const dateMatch = row.posting_date && row.posting_date.includes(reversedDate); 

          return nameMatch && statusMatch && grand_totalMatch && dateMatch;
        });
      });

      const getStatusTheme = (status) => {     
      switch (status) {
        case 'Draft':
          return { theme: "red" };  
        case 'Completed':
          return { theme: "blue" };
        case 'Cancelled':
          return { theme: "Green" };  
        case 'Closed':
          return { theme: "orange" };        
        default:
          return { theme: "gray" };
      }
    }
    




      onMounted(() => {
        shipment()
      })
  
      return {
        isSidebarCollapsed,
        sidebarcol,
        rows,
        columns,
        toggleSidebar,
        OpenClick,
        updatePaginatedRows,
        paginatedRows,
        filterName,
        filterStatus,
        filterTotal,
        filteredRows,
        filterDate,
        resetFilters,
        getStatusTheme,
        isLoading,
        reload
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
  