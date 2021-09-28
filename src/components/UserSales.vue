<template>
    <div class="container">
        <div class="row mt-5 d-flex justify-content-center">
            <div class="col-md-6" v-if="hasData">
                <h5>My Purchases</h5>
                <div class="card shadow mb-3" v-for="sale in sales" :key="sale._id">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-md-4">
                            <img class="img-fluid rounded"  v-bind:src="'http://localhost:8080/' + sale.bookId.image" alt="Card image cap">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">{{sale.bookId.title}}</h5>
                            <p class="card-text">GH&cent; {{sale.amount}}</p>
                            
                        </div>
                        </div>
                                        
                    </div>
                </div>
            </div>
            <div class="col-md-6" v-if="!hasData">
                <h5>My Purchases</h5>
                <div class="alert alert-info">
                    <h5>{{errorData}}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SaleService from '../services/sale-service'

export default {
  name: 'UserSales',
  data() {
    return {
      sales: [],
      hasData: false,
      errorData: 'You have not purchased any book',

    }
  },
  computed: {
    currentUser() {
        return this.$store.state.auth.user;
    },        
 },
  mounted() {
    
    SaleService.getUserSales(this.currentUser.id)
      .then(response => {
        const data = response.data;
        this.sales = data.sales;
        if(this.sales.length > 0) {
          this.hasData = true;
        }

      })
      .catch(error => {
        console.log(error);
        this.errorData = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      });
  },
  methods: {
    
  }
}
</script>