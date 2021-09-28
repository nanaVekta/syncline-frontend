 <template>
     <div class="container">
         <div class="row mt-5 d-flex justify-content-center">
             <div class="col-md-12" v-if="!hasData">
                 <div class="alert alert-danger">
                     <h2>{{errorData}}</h2>
                 </div>
             </div>

             <div class="col-md-6" v-if="hasData">
                <div class="card shadow mb-3" v-for="book in books" :key="book._id">
                    <div class="card-body">
                        <div class="row" >
                            <div class="col-sm-2">
                                <img v-bind:src="'http://localhost:8080/' + book.image" alt="book" class="img-fluid rounded">
                            </div>
                            <div class="col-sm-7">
                                <h5>{{book.title}}</h5>
                            </div>
                            <div class="col-sm-3">
                                <button class="btn btn-danger" @click="removeBook(book._id)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <button class="btn btn-primary" @click="checkout">Checkout</button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-danger" @click="clearCart">Clear All</button>
                    </div>
                </div>
             </div>
         </div>
     </div>
 </template>

<script>
    import SaleService from '../services/sale-service'

    export default {
        name: 'Cart',
        data() {
            return {
                books: [],
                hasData: false,
                errorData: 'There are no items added to cart',
                success: false,
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            
        },
        mounted() {
            if (localStorage.getItem('slCart')) {
                try {
                    this.books = JSON.parse(localStorage.getItem('slCart'));
                    this.hasData = true;
                } catch(e) {
                    this.hasData = false;
                }
            }
            else {
                this.hasData = false;
            }
        },
        
        methods: {
            clearCart() {
                localStorage.removeItem('slCart');
                this.books = [];
                this.hasData = false;
            },
            removeBook(id) {
                this.books = this.books.filter(book => book._id !== id);
                localStorage.setItem('slCart', JSON.stringify(this.books));
                if (this.books.length === 0) {
                    this.hasData = false;
                }
            },

            checkout() {
                if (this.books.length === 0) {
                    this.$swal({
                        title: 'Error',
                        text: 'There are no items added to cart',
                        type: 'error'
                    });
                }
                else {
                    this.$swal({
                        title: 'Enter amount to checkout',
                        input: 'number',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Checkout',
                        showLoaderOnConfirm: true,
                        preConfirm: (amount) => {
                            for(let i = 0; i < this.books.length; i ++){
                                let book = this.books[i];
                                let sale = {
                                    bookId: book._id,
                                    amount: amount,
                                    userId: this.currentUser.id
                                };
                                SaleService.createSale(sale)
                                .then(response => {
                                    const data = response.data;
                                    const lastBook = this.books.length - 1;
                                    if(data.message == 'success' && i == lastBook){
                                        this.$swal({
                                            title: 'Checkout successfull',
                                            type: 'success',
                                            showConfirmButton: false,

                                        });
                                        this.clearCart();
                                    }
                                    else {
                                        if(i == lastBook){
                                            this.$swal({
                                                title: 'Checkout failed',
                                                type: 'error',
                                                showConfirmButton: false,
                                            });
                                        }
                                    }
                                })
                            }
                            
                        },
                        })
                }
            }
            
        }
    }
</script>