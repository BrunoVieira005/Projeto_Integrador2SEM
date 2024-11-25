<template>
  <div class="container">
    <div class="header">
      <div class="icon"></div>
      <h1 class="header-title">Login</h1>
    </div>
    <div class="blue-background"></div>

    <div class="login-box">
      <h2 class="login-box-title">Login</h2>
      <form @submit.prevent="loginUser">
        <div class="input-field-one">
          <input v-model="username" type="text" required placeholder="Usuário" />
        </div>
        <div class="input-field-two">
          <input v-model="password" type="password" required placeholder="Senha" />
        </div>

        <div class="remember-me">
          <input type="checkbox" id="remember" />
          <label for="remember">Lembrar-me</label>
        </div>

        <button class="button-login" type="submit">
          <span class="button-login-text">Entrar</span>
        </button>

        <p class="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </p>
      </form>

      <p v-if="message" class="register-link">
        Não tem uma conta? 
        <a href="/register" class="register-link-text">Registre-se aqui</a>
      </p>
    </div>

    <div class="welcome-message">
      Bem-vindo de volta!
    </div>
  </div>
</template>

<script>
import api from '../axios'; // Importa a configuração do Axios

export default {
  data() {
    return {
      username: '', 
      password: '',
      message: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username, 
          password: this.password,
        });
        this.message = 'Login bem-sucedido!';
        localStorage.setItem('token', response.data.token); // Armazena o token JWT no localStorage
        this.$router.push('/dashboard'); // Redireciona para a página principal após o login
      } catch (error) {
        this.message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erro ao fazer login.';
      }
    }
  }
};
</script>

<style scoped>
  * {
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    margin: auto;
    width: 100%;
    height: 638px;
    background: rgb(255, 255, 255);
    position: relative;
    overflow: hidden;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 115px;
    background: rgba(0, 110, 173, 1);
  }

  .header-title {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 32px;
    margin: 0 20px;
  }

  .icon {
    width: 149px;
    height: 108px;
    background: url("../assets/book.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin-left: 10px;
  }

  .blue-background {
    width: 100%;
    height: 275px;
    background: rgba(0, 110, 173, 1);
    position: absolute;
    top: 232px;
    left: 0;
  }

  .login-box {
    width: 317px;
    height: 455px;
    background: rgb(247, 245, 245);
    position: absolute;
    display: flex;
    justify-content: center;
    top: 137px;
    left: 859px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .login-box-title {
    width: 257px;
    color: rgba(0, 0, 0, 1);
    font-family: Sarala;
    font-weight: Regular;
    font-size: 24px;
    text-align: left;
    margin-bottom: 20px;
  }

  .input-field-one, .input-field-two {
    width: 257px;
    height: 36px;
    background: rgba(245, 245, 245, 1);
    border-radius: 28px;
    margin-bottom: 15px;
  }

  .input-field-one input, .input-field-two input {
    width: 100%;
    height: 100%;
    padding: 0 15px;
    border: none;
    border-radius: 28px;
    box-sizing: border-box;
  }

  .input-field-one input::placeholder, 
  .input-field-two input::placeholder {
    color: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }

  .label-email, .label-password {
    width: 38px;
    color: rgba(0, 0, 0, 1);
    font-family: Sarala;
    font-weight: Regular;
    font-size: 11px;
    text-align: left;
  }

  .remember-me {
    display: flex;
    align-items: center;
    width: 94px;
    color: rgba(0, 0, 0, 1);
    font-family: Sarala;
    font-weight: Regular;
    font-size: 10px;
    text-align: left;
  }

  .remember-me label {
    margin-left: 3px;
  }

  .button-login {
    width: 257px;
    height: 36px;
    background: rgba(10, 10, 10, 1);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;
    margin-top: 10px;
  }

  .button-login-text {
    width: 37px;
    color: rgba(255, 255, 255, 1);
    font-family: Sarala;
    font-weight: Bold;
    font-size: 13px;
    text-align: center;
  }

  .forgot-password {
    width: 110px;
    color: rgba(0, 0, 0, 1);
    font-family: Sarala;
    font-weight: Bold;
    font-size: 10px;
    text-align: left;
    margin-top: 15px;
  }

  .register-link {
    width: 227px;
    font-size: 12px;
    text-align: left;
  }

  .register-link-text {
    color: rgba(0, 110, 173, 1);
    text-decoration: none;
    font-weight: bold;
  }

  .welcome-message {
    width: 331px;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 261px;
    left: 436px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 40px;
    text-align: left;
  }
</style>