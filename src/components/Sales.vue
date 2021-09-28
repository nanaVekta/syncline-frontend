<template>
    <div class="container">
        <div class="row mt-5 d-flex justify-content-center">
            <div class="col-md-6" v-if="hasData">
                <h5>All Purchases</h5>
                <div class="card shadow mb-3" v-for="sale in sales" :key="sale._id">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-md-4">
                            <img class="img-fluid rounded"  v-bind:src="'http://localhost:8080/' + sale.bookId.image" alt="Card image cap">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">{{sale.bookId.title}}</h5>
                            <p class="card-text">GH&cent; {{sale.amount}}</p>
                            <h6 class="font-weight-bold">Bought by</h6>
                            <p class="card-text"> {{sale.userId.name}}</p>
                            
                        </div>
                        </div>
                                        
                    </div>
                </div>
            </div>
            <div class="col-md-6" v-if="!hasData">
                <h5>All Purchases</h5>
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
  name: 'Sales',
  data() {
    return {
      sales: [],
      hasData: false,
      errorData: 'There are no purchases made at the moment',

    }
  },
  mounted() {
    
    SaleService.getAllSales()
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