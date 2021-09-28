<template>
    <div class="container">
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-md-8" v-if="hasData">
                <div class="card">
                  <div class="card-body">
                      <div class="row">
                        <div class="col-sm-6">
                            <img class="card-img-top"  v-bind:src="'http://localhost:8080/' + book.image" alt="Card image cap">
                        </div>
                        <div class="col-sm-6">
                            <h5 class="card-title">{{book.title}}</h5>
                             <h6 class="mt-3 font-weight-bold">Quantity</h6>
                            <p class="card-text">{{book.quantity}}</p>
                            <h6 class="mt-3 font-weight-bold">Description</h6>
                            <p>{{book.description}}</p>  
                            <router-link v-if="isAdmin" :to="'/book/edit/' + book._id">
                            <button class="btn btn-primary">Edit</button>    
                            </router-link>    
                            <button v-if="!isAdmin" class="btn btn-warning"  @click="addToCart(book)">Add To Cart</button> 
                        </div>
                      </div>
                         
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>

import BookService from '../services/book-service';

export default {
    name: 'Book',
    data() {
        return {
            bookId: this.$route.params.id,
            book: null,
            hasData : false,
            cartItems: [],
            cartItem: null,
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        isUserAdmin() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_ADMIN');
            }

            return false;
        },
        
    },
    mounted() {
        
        BookService.getBook(this.bookId)
        .then(response => {
            const data = response.data;
            this.book = data.book;
            this.hasData = true;
        })
        .catch(error => {
            console.log(error);
        });

    },
    methods: {
        bookAlreadyInCart(book, books) {
            var i;
            for (i = 0; i < books.length; i++) {
                if (books[i].id === book.id) {
                    return true;
                }
            }

            return false;
        },
        addToCart(book) {
            if (localStorage.getItem('slCart')) {
                try {
                    this.cartItems = JSON.parse(localStorage.getItem('slCart'));
                } catch(e) {
                    localStorage.removeItem('slCart');
                }
            }
            if(!this.bookAlreadyInCart(book, this.cartItems)) {
                this.cartItem = book;
                this.cartItems.push(this.cartItem);  
                localStorage.setItem('slCart', JSON.stringify(this.cartItems));
                this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Item added to cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                this.$swal({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Item already in cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            
        },
    }
}
</script>