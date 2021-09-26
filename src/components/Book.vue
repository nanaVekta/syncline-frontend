<template>
    <div class="container">
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-md-6" v-if="hasData">
                <div class="card">
                    <img class="card-img-top"  v-bind:src="'http://localhost:8080/' + book.image" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">{{book.title}}</h5>
                    <p class="card-text">Quantity: {{book.quantity}}</p>
                    <p>{{book.description}}</p>  
                    <router-link v-if="isAdmin" :to="'/book/edit/' + book._id">
                    <button class="btn btn-primary">Edit</button>    
                    </router-link>    
                    <button v-if="!isAdmin" class="btn btn-warning">Add To Cart</button>      
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
            hasData : false
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
        }
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

    }
}
</script>