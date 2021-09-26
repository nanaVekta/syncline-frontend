<template>
    <div class="container">
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card" v-if="hasData">
                    <div class="card-header">
                        <h2 class="card-title">Add Book</h2>
                    </div>
                    <div class="card-body">
                        <Form @submit="handleSubmit" :validation-schema="schema">
                            <div v-if="!successful">
                                
                                <div class="form-group">
                                    <Field name="title" type="text" class="form-control" placeholder="Enter title" :value="book.title"/>
                                    <ErrorMessage name="title" class="error-feedback" />
                                </div>
                                <div class="form-group">
                                    <Field name="quantity" type="number" class="form-control" placeholder="Enter quantity" :value="book.quantity" min="1"/>
                                    <ErrorMessage name="quantity" class="error-feedback" />
                                </div>
                                <div class="form-group">
                                    <Field name="description" as="textarea" class="form-control" placeholder="Enter description" :value="book.description" />
                                    <ErrorMessage name="description" class="error-feedback" />
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-primary btn-block" :disabled="loading">
                                    <span
                                        v-show="loading"
                                        class="spinner-border spinner-border-sm"
                                    ></span>
                                    Edit
                                    </button>
                                </div>
                            </div>
                        </Form>

                        <div
                            v-if="message"
                            class="alert"
                            :class="successful ? 'alert-success' : 'alert-danger'"
                        >
                            {{ message }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '../services/book-service';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: 'UpdateBook',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
        
            title: yup
                .string()
                .required("Title is required!"),
            description: yup
                .string()
                .required("Description is required!"),
            quantity: yup
                .number()
                .required("Quantity is required!"),
        });
        return {
            bookId: this.$route.params.id,
            book: null,
            hasData : false,
            successful: false,
            loading: false,
            message: "",
            schema,
            file: ''
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

    },
    methods: {
        handleSubmit(book) {
            this.message = "";
            this.successful = false;
            this.loading = true;

        BookService.updateBook(book, this.bookId).then(
            (response) => {
                this.message = response.data.message;
                this.successful = true;
                this.loading = false;
            },
            (error) => {
            this.message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
            }
        );
        },
    }
}
</script>