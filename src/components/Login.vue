<template>
    <div class="container">
        <div class="row mt-4">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <div class="card">
                  <div class="card-header">
                      <h2 class="card-title">Login</h2>
                  </div>
                  <div class="card-body">
                      <Form @submit="handleLogin" :validation-schema="schema">
                          <div class="form-group">
                              <Field name="email" type="email" class="form-control" placeholder="Enter Email" />
                              <ErrorMessage name="email" class="error-feedback" />
                          </div>
                          <div class="form-group">
                              <Field name="password" type="password" class="form-control" placeholder="Enter Password"/>
                              <ErrorMessage name="password" class="error-feedback" />
                          </div>

                          <div class="form-group">
                          <button class="btn btn-primary btn-block" :disabled="loading">
                              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                              <span>Login</span>
                          </button>
                          </div>

                          <div class="form-group">
                          <div v-if="message" class="alert alert-danger" role="alert">
                              {{ message }}
                          </div>
                          </div>
                      </Form>
                  </div>
              </div>
          </div>
          <div class="col-md-3"></div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
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