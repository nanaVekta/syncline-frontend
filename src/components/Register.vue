<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-md-offset-3">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Register</h2>
                    </div>
                    <div class="card-body">
                        <Form @submit="handleRegister" :validation-schema="schema">
                            <div v-if="!successful">
                                <div class="form-group">
                                    <Field name="name" type="text" class="form-control" placeholder="Enter full name" />
                                    <ErrorMessage name="name" class="error-feedback" />
                                </div>
                                <div class="form-group">
                                    <Field name="email" type="email" class="form-control" placeholder="Enter email" />
                                    <ErrorMessage name="email" class="error-feedback" />
                                </div>
                                <div class="form-group">
                                    <Field name="password" type="password" class="form-control" placeholder="Enter password"/>
                                    <ErrorMessage name="password" class="error-feedback" />
                                </div>
                                <div class="form-group">
                                    <Field name="phone" type="tel" class="form-control" placeholder="Enter phone"/>
                                    <ErrorMessage name="phone" class="error-feedback" />
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-primary btn-block" :disabled="loading">
                                    <span
                                        v-show="loading"
                                        class="spinner-border spinner-border-sm"
                                    ></span>
                                    Sign Up
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Full name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      phone: yup
        .string()
        .required("Phone is required!")
        .min(9, "Must be at least 9 characters!")
        .max(15, "Must be maximum 15 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    //TODO: check redirect to dashboard or cart
    // if (this.loggedIn) {
    //   this.$router.push("/profile");
    // }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
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
  },
};
</script>

<style scoped>
.error-feedback{
  color: red;
}
</style>