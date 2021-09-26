<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <router-link to="/book/add">
                <button class="btn btn-primary">Add New</button>
              </router-link>
            </div>
        </div>
        <div class="row mt-5" v-if="!hasData">
            <div class="col-md-12">
              <div class="alert alert-danger">{{errorData}}</div>
            </div>
        </div>
        <div class="row mt-5" v-if="hasData">
            <div class="col-md-3" v-for="book in books" :key="book._id">
              <div class="card">
                <img class="card-img-top"  v-bind:src="'http://localhost:8080/' + book.image" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">{{book.title}}</h5>
                    <p class="card-text">Quantity: {{book.quantity}}</p>
                    <div class="row">
                      <div class="col-sm-6">
                        <router-link :to="'/book/' + book._id">
                          <button class="btn btn-primary">View</button>
                        </router-link>
                      </div>
                      <div class="col-sm-6">
                         <button class="btn btn-danger" @click="showAlert(book._id)">Delete</button>
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
  name: 'Dashboard',
  data() {
    return {
      books: [],
      hasData: false,
      errorData: 'There are no books added at the moment'
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

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
    showAlert(id) {
      // Use sweetalert2
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

      }).then((result) => {
        if (result.value) {
          BookService.deleteBook(id)
            .then(response => {
              const data = response.data;
              if(data.message == 'success') {
                this.$swal(
                  'Deleted!',
                  'Your book has been deleted.',
                  'success'
                )
                this.books = this.books.filter(book => book._id !== id);
              }
              else{
                this.$swal(
                  'Error!',
                  'Something went wrong.',
                  'error'
                )
              }
            })
            .catch(error => {
              console.log(error);
              this.$swal(
                'Error!',
                'Your book has not been deleted.',
                'error'
              )
            });
        }
      })
    },
  }
};
</script>