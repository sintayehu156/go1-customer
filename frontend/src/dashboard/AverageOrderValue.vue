<template>
    <div class="number-card">
        <div class="card-content text-gray-700">
        <h4><b>AVERAGE ORDER VALUE</b></h4>
        <p class="currency">
            {{ averageOrderValue ? formatCurrency(averageOrderValue.value) : 0 }}
        </p>
        <!-- <p v-if="orderCount">Total Orders: {{ orderCount }}</p> -->
        </div>
    </div>
</template>
  
  
<script>
import { ref, onMounted } from 'vue';

export default {
setup() {
    const averageOrderValue = ref(null);

    const fetchAverageOrderValue = async () => {
    try {
        const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.average_order_value');
        const data = await response.json();
        averageOrderValue.value = data.message;
    } catch (error) {
        console.error('Error fetching Average Order Value:', error);
    }
    };

    const formatCurrency = (value) => {
    return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    };

    onMounted(fetchAverageOrderValue);

    return {
    averageOrderValue,
    formatCurrency
    };
},
};
</script>
  
<style scoped>
.number-card {
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 20px;
  text-align: left;
  /* width: 242px; */
  height: 100px;
}

.card-content h4 {
  font-size: 10px;
}

.currency {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}

p {
  font-size: 13px;
  margin: 0;
  color: #4F75FF;
}
</style>
