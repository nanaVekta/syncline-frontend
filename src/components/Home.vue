<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-6 mt-5">
        <h1>Find Your Book and Loose Yourself</h1>
        <h3>Escape from reality with your favourite book. Pick from a variety of books</h3>

        <form class="form-inline mt-4">
          <div class="form-group mx-sm-3 mb-2">
            <input v-model="title" type="search" class="form-control" placeholder="Search book">
          </div>
          <button type="button" class="btn btn-primary mb-2" @click="searchBook">Search</button>
        </form>
      </div>
      <div class="col-md-6">
        <img src="../assets/header.jpg" class="img-fluid">
      </div>
    </div>
    <div class="row mt-5" v-if="!hasData">
        <div class="col-md-12">
          <div class="alert alert-danger">{{errorData}}</div>
        </div>
    </div>

    
    <div class="row mt-5" v-if="hasData">
        <div class="col-md-4 mt-3" v-for="book in books" :key="book._id">
          <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <img class="img-fluid rounded"  v-bind:src="'http://localhost:8080/' + book.image" alt="Card image cap">
                  </div>
                  <div class="col-md-8">
                    <h5 class="card-title">{{book.title}}</h5>
                    <p class="card-text">{{book.quantity}} left</p>
                    <div class="row">
                      <div class="col-sm-5">
                        <router-link :to="'/book/' + book._id">
                          <button class="btn btn-primary btn-sm">View</button>
                        </router-link>
                      </div>
                      <div class="col-sm-7">
                          <button class="btn btn-warning btn-sm" @click="addToCart(book)">Add To Cart</button>
                      </div>
                    </div>  
                  </div>
                </div>
                                  
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BookService from '../services/book-service'

export default {
  name: 'Home',
  data() {
    return {
      books: [],
      hasData: false,
      errorData: 'There are no books added at the moment',
      cartItems: [],
      cartItem: null,
      title: '',
    }
  },
  mounted() {
    
    BookService.getBooks()
      .then(response => {
        const data = response.data;
        this.books = data.books;
        if(this.books.length > 0) {
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
    searchBook(){        
      BookService.searchBook(this.title)
      .then(response => {
        const data = response.data;
        this.books = data.books;
        if(this.books.length > 0) {
          this.hasData = true;
        }
        else { 
          this.hasData = false;
          this.errorData = 'No search results for '+ this.title;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    font-weight: bolder;
    font-size: 3.5em;
  }
</style>
