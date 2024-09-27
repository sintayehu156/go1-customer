<template>
  <div class="main">
  <div class="left-div w-1/3">
    <div :class="['sidebar', { 'collapsed': isCollapsed }] " >
      <Dropdown
        :options="[    
          { label: 'Support', icon: 'life-buoy' }, 
          { label: 'Docs', icon: 'book-open' }, 
          { label: 'Logout', icon: 'log-out', onClick:sessionCheck }, 
        ]"
      >
      <Button :variant="'ghost'" :class="{ 'active': isActive }" class="h-13" @click="isActive = !isActive">
          <template v-if="isCollapsed">
                  <Avatar
                    class="flex-shrink-0 rounded" 
                    :shape="'square'"
                    image="http://192.168.0.156:8008/assets/erpnext/images/erpnext-logo.svg"
                    label="EY"
                    size="lg"
                  />              
                </template>
                <template v-else>
                  <div style="margin-left:40px">
                    <div class="flex-shrink-0 text-sm duration-300 ease-in-out mr-1 ml-0 w-auto opacity-100" style="float:left;">
                      <Avatar
                        class="size-8 flex-shrink-0 rounded"
                        :shape="'square'"
                        image="http://192.168.0.156:8008/assets/erpnext/images/erpnext-logo.svg"
                        label="EY"
                        size="lg"
                        style="margin-left:-61px"
                      />
                    </div>
                    <div class="flex flex-1 flex-col text-left duration-300 ease-in-out ml-2 w-auto opacity-100" style="float:left;margin-top:-2px">
                      <p class="font-medium" style="margin-left:-15px">Go1 Customer</p>
                      <p style="margin-left:-15px;">{{  logged_users.data }}</p>

                    </div>
                    <div style="float:left;margin-left:30px;margin-top:5px" class="duration-300 ease-in-out ml-2 w-auto opacity-100">
                      <FeatherIcon class="w-4" name="chevron-down" />
                    </div>
                  </div>               
                </template>
        </Button>
    
      </Dropdown>

      <div v-if="dynamicsApp.data && dynamicsApp.data.length">
        <div v-for="(row, index) in dynamicsApp.data" :key="index">
          <Button 
            @click="handleButtonClick(row.title, row.route)" 
            :variant="'ghost'"
            theme="gray"
            :class="['navigation-button flex items-center rounded px-2 py-1 text-gray-800 transition hover:bg-gray-100 mt-0.5', { 'active': isActiveButton(row.route) }]">
            <template v-if="isCollapsed">
              <FeatherIcon class="w-4" :name="row.icon"/>
            </template>
            <template v-else>
              <div class="flex w-full items-center space-x-2">
                <div style="float:left"><FeatherIcon class="w-4 text-gray-500" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2" :name="row.icon"/></div>
                <div class="flex-shrink-0 text-sm duration-300 ease-in-out ml-2 w-auto opacity-100" style="float:left;">{{ row.title }}</div>
              </div>
            </template>
          </Button>
        </div>
      </div>

      <!-- Toggle Sidebar Button -->
      <Button class="toggle-button mb-2" @click="$emit('toggle')" :variant="'ghost'" size="sm">
        <template v-if="isCollapsed">
          <svg fill="#000000" width="40px" height="64px" viewBox="-24 -24 72.00 72.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.0030000000000000003" transform="matrix(1, 0, 0, 1, 0, 0)rotate(180)">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.192"/>
          <g id="SVGRepo_iconCarrier"> <path d="M5.70710678,12 L8.85355339,15.1464466 C9.04881554,15.3417088 9.04881554,15.6582912 8.85355339,15.8535534 C8.65829124,16.0488155 8.34170876,16.0488155 8.14644661,15.8535534 L4.14644661,11.8535534 C3.95118446,11.6582912 3.95118446,11.3417088 4.14644661,11.1464466 L8.14644661,7.14644661 C8.34170876,6.95118446 8.65829124,6.95118446 8.85355339,7.14644661 C9.04881554,7.34170876 9.04881554,7.65829124 8.85355339,7.85355339 L5.70710678,11 L16.5,11 C16.7761424,11 17,11.2238576 17,11.5 C17,11.7761424 16.7761424,12 16.5,12 L5.70710678,12 Z M19,3.5 C19,3.22385763 19.2238576,3 19.5,3 C19.7761424,3 20,3.22385763 20,3.5 L20,19.5 C20,19.7761424 19.7761424,20 19.5,20 C19.2238576,20 19,19.7761424 19,19.5 L19,3.5 Z"/> </g>
          </svg>
        </template>
        <template v-else>       
          <div class="flex items-center ">          
              <div class="flex items-center ">
                <span>
                  <svg fill="#000000" width="45px" height="64px" viewBox="-24 -24 72.00 72.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.192"/>
                  <g id="SVGRepo_iconCarrier"> <path d="M5.70710678,12 L8.85355339,15.1464466 C9.04881554,15.3417088 9.04881554,15.6582912 8.85355339,15.8535534 C8.65829124,16.0488155 8.34170876,16.0488155 8.14644661,15.8535534 L4.14644661,11.8535534 C3.95118446,11.6582912 3.95118446,11.3417088 4.14644661,11.1464466 L8.14644661,7.14644661 C8.34170876,6.95118446 8.65829124,6.95118446 8.85355339,7.14644661 C9.04881554,7.34170876 9.04881554, 7.65829124 8.85355339,7.85355339 L5.70710678,11 L16.5,11 C16.7761424,11 17,11.2238576 17,11.5 C17,11.7761424 16.7761424,12 16.5,12 L5.70710678,12 Z M19,3.5 C19,3.22385763 19.2238576,3 19.5,3 C19.7761424,3 20,3.22385763 20,3.5 L20,19.5 C20,19.7761424 19.7761424,20 19.5,20 C19.2238576,20 19,19.7761424 19,19.5 L19,3.5 Z"/> </g>
                  </svg>
                  </span>
                <span>Collapse</span>
              </div>       
          </div>
        </template>
      </Button>
    </div>
  </div>
  <div class="right-div w-2/3">
    
  </div>
</div>
  
</template>

<script>
import {  ref } from 'vue'; 
import { Popover, Dropdown, Button, FeatherIcon, Avatar, createResource } from 'frappe-ui';
import { useRoute, useRouter } from 'vue-router'; 
import { session } from '@/data/session';
console.log("EEEEEEEE",session)
export default {
  components: {
    Popover,
    Button,
    FeatherIcon,
    Avatar,
    Dropdown,    
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isPopoverActive: false,
      session, 
      activeButton: null ,
      rows: [] ,
      
      
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const rows = ref([]); 
    const username =ref(['loading']);
  
      
    

    const users = createResource({
      url: 'go1_customer.go1_customer.go1.get_username',
      cache:['true']
    });
    const session_users=users;
    const logged_users=session_users;
    const dynamicsApp = createResource({
    url: 'go1_customer.go1_customer.api.api.get_navbar_routes',
    cache: ['route','title'],
    auto: true 
  });
   
  console.log('dynamicddds:',  dynamicsApp);
  console.log('d222222ynamics data:', dynamicsApp.data);
    console.log("usersdaata0----",users.fetch())
    console.log('dddddd',users.data);
 
   
    const isActiveButton = (routePath) => {
      return route.path === routePath;
    };

    return {
      isActiveButton, 
      rows,
      logged_users,
      dynamicsApp,
      isActive: false,
      
    };
  },
  methods: {
    handleButtonClick(buttonName, routePath) {
      this.setActiveButton(buttonName); 
      if (routePath) {
        this.$router.push(routePath); 
      }
      // if(this.isCollapsed){
        this.$emit('true');
        console.log('hit')
      // }    
    },
   
    sessionCheck() {
      session.logout.submit(); 
    },
   
    setActiveButton(button) {
      this.activeButton = button;
    },   
  }
};
</script>



<style scoped>
.active {
  background-color: #ccc;
  border-color: #aaa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.sidebar {
  width: 220px;
  background-color: rgb(248 248 248);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: width 0.3s ease;
}

.collapsed {
  width: 60px;
}

.navigation-button {
  display: block;
  width: 100%;
  text-align: left;
  padding-left: .5rem;
  padding-right: .5rem;
}

.navigation-button .active{
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
  margin-top: 0.125rem; 
  transition: all 0.2s ease-in-out;
  color: #2d3748;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); 
}
.toggle-button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}



button.active {
  background-color: white;
  /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
  margin-top: 0.125rem; 
  transition: all 0.2s ease-in-out;
  color: #2d3748;
  border-radius: 0.25rem; 
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  display:block; */
  align-items: center; 
  border-radius: 0.25rem; 
  padding-left: 0.5rem; 
  padding-right: 0.5rem; 
  padding-top: 0.25rem; 
  padding-bottom: 0.25rem; 
  color: #4a5568; 
  transition: all 0.2s ease;
  background-color: #ffffff; 
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); 
  margin-top: 0.125rem; 
}
</style>




