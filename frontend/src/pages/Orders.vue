<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-2.5 sm:px-5">
          Sales Order
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content">
        <div class="fiter mb-2 flex gap-3">
          <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" />         
          <FormControl type="select"
            :options="[
              {},
              { label: 'Draft',value: 'Draft',}, { label: 'On Hold',value: 'On Hold',}, { label: 'To Deliver and Bill',value: 'To Deliver and Bill',},
              { label: 'Completed',value: 'Completed',},   { label: 'To Deliver',value: 'To Deliver',},   { label: 'To Bill',value: 'To Bill',},             
              { label: 'Cancelled',value: 'Cancelled',}, { label: 'Closed',value: 'Closed',},                 
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
            getRowRoute: (row) => ({ name: 'OrderDetails', params: { id: row.name } }),
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
import ListView from '@/components/ListView/ListView.vue'
import RefreshButton from '@/components/RefreshButton.vue'
import Pagination from '@/components/Pagination.vue'
import { ref, onMounted,computed } from 'vue'
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
    const rows = ref([])
    const paginatedRows = ref([]) 
    const isLoading = ref(false)
    const columns = ref([
      { label: 'Name', key: 'name', width: '250px' },
      { label: 'Status', key: 'status', width: '200px' },
      { label: 'Date', key: 'transaction_date', width: '200px' },
      {label:'Item', key:'item_name', width:'200px'},
      { label: 'Total', key: 'grand_total', width: '200px' },
    ])

    const order = createResource({
      url: 'go1_customer.go1_customer.api.api.get_salesorder',
      method: 'get',
    })

    const fetchorder = async () => {
      try {
        isLoading.value = true
        const data = await order.fetch()
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
      fetchorder() 
    }

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const router = useRouter()

    const OpenClick = (row) => {
      console.log('Row clicked:', row)
      if (row && row.name) {
        router.push({ name: 'OrderDetails', params: { id: row.name } })
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
        const totalMatch = row.total.toString().includes(filterTotal.value.toString()) || !filterTotal.value; 
        const reversedDate = filterDate.value.split('-').reverse().join('-');
        const dateMatch = row.transaction_date && row.transaction_date.includes(reversedDate); 
        return nameMatch && statusMatch && totalMatch && dateMatch;
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
        case 'On Hold':
          return { theme: "orange" };             
        default:
          return { theme: "gray" };
      }
    }

    onMounted(() => {
      fetchorder()
    })

    return {
      isSidebarCollapsed,
      rows,
      paginatedRows, 
      columns,
      toggleSidebar,
      OpenClick,
      updatePaginatedRows,
      filterName,
      filterStatus,
      filterTotal,
      filteredRows,
      filterDate,
      resetFilters,  
      getStatusTheme,
      reload,
      isLoading
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
