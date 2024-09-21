<!-- <template>
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

    const order = createResource({
      url: '/api/method/frappe.client.get_list',
      params: {
        doctype: 'Sales Order',
        fields: ['*'],
      },
    });

    const fetchissuedetails = async () => {
      try {
        const id = route.params.id;
        const data = await order.fetch();
        const issuedetails = data.find(item => item.name === id);
        if (issuedetails) {
          name.value = issuedetails.name;
          inputValue.value = issuedetails.status; 
        }
        console.log('Fetched order details:', issuedetails);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    onMounted(() => {
      fetchissuedetails();
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
 -->

 <template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header
          class="border-b bg-white px-5 py-6.5 pb-[2.625rem] sm:px-5 mb-12"
        >
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
          <!-- <Button
            :variant="'solid'"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            class="float-right"
          >
          
          </Button> -->
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content">
        <div class="bg-white shadow-md rounded-lg p-6 space-y-6">
          <!-- Section 1: Form Title -->
          <div class="border-b pb-7 pt-10">
            <p
              class="text-9xl font-bold text-gray-800 float-left -mt-2"
              style="font-size: 1.85rem"
            >
              Issue
            </p>
            <Button
              :variant="'solid'"
              theme="gray"
              size="sm"
              label="Edit"
              :disabled="false"
              class="float-right mb-4"
            /><br />
            <p
              class="text-9xl font-bold text-gray-600 mt-4"
              style="font-size: 1rem"
            >
              {{ subject }}
            </p>

            <div class="flex justify-end space-x-4 pt-4"></div>
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
            <FormControl
              :type="'text'"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
              label="Label"
              v-model="inputValue"
            />
            <FormControl
              :type="'text'"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
              label="Label"
              v-model="inputValue"
            />
            <FormControl
              :type="'textarea'"
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
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import { ref, watch, onMounted, computed } from 'vue'
import { createResource, Breadcrumbs, Button, FormControl } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    LeftSidebar,
    Breadcrumbs,
    Button,
    FormControl,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const isSidebarCollapsed = ref(false)
    const name = ref('')
    const inputValue = ref('')
    const itemValue = ref([])
    const totalValue = ref([])
    const subject = ref([])
    const issues = createResource({
      url: 'go1_customer.go1_customer.api.api.get_issues',
      method: 'get',
    })

    const breadcrumbsList = ref([
      { label: 'Issues', route: { name: 'issue' } },
      { label: '', route: {} },
    ])

    const fetchissuedetails = async () => {
      try {
        const id = route.params.id
        const data = await issues.fetch()
        const issuedetails = data.find((item) => item.name === id)
        if (issuedetails) {
          name.value = issuedetails.name
          subject.value = issuedetails.subject
          inputValue.value = issuedetails.status
          itemValue.value = issuedetails.items || []
          totalValue.value = issuedetails.total
        }
      } catch (error) {
        console.error('Error fetching invoice details:', error)
      }
    }

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    watch(name, (newName) => {
      breadcrumbsList.value[1].label = newName
    })

    onMounted(() => {
      fetchissuedetails()
    })

    // Computed properties to determine the status color
    const statusColor = computed(() => {
      switch (inputValue.value.toLowerCase()) {
        case 'draft':
          return 'red'
        case 'ordered':
          return 'green'
        case 'partially ordered':
          return 'yellow'
        case 'lost':
          return 'red'
        case 'cancelled':
          return 'red'
        case 'expired':
          return 'gray'
        default:
          return 'gray'
      }
    })

    const statusColorText = computed(() => {
      switch (inputValue.value.toLowerCase()) {
        case 'draft':
          return 'text-red-400'
        case 'ordered':
          return 'text-green-400'
        case 'partially ordered':
          return 'text-yellow-400'
        case 'lost':
          return 'text-red-400'
        case 'cancelled':
          return 'text-red-600'
        case 'expired':
          return 'text-gray-600'
        default:
          return 'text-gray-300'
      }
    })

    const statusBorColor = computed(() => {
      switch (inputValue.value.toLowerCase()) {
        case 'draft':
          return 'border-red-400'
        case 'ordered':
          return 'border-green-400'
        case 'partially ordered':
          return 'border-yellow-400'
        case 'lost':
          return 'border-red-400'
        case 'cancelled':
          return 'border-red-600'
        case 'expired':
          return 'border-gray-600'
        default:
          return 'border-gray-300'
      }
    })

    // Dynamically set border width for the status dot
    const borderWidth = computed(() => 'auto')

    return {
      isSidebarCollapsed,
      name,
      inputValue,
      subject,
      itemValue,
      totalValue,
      toggleSidebar,
      breadcrumbsList,
      statusColor,
      statusColorText,
      statusBorColor,
      borderWidth,
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
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border-width: var(--border-width, 2px); /* Use dynamic border width */
}
</style>
  