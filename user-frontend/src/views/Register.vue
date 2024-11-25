<template>
  <div class="container">
    <div class="header">
      <div class="icon"></div>
      <h1 class="header-title">Mange Book</h1>
    </div>
    <div class="blue-background"></div>

    <div class="register-box">
      <h2 class="register-box-title">Cadastro</h2>
      <form @submit.prevent="registerUser">
        <div class="input-field-one">
          <input v-model="username" type="text" required placeholder="Usuário" />
        </div>
        <div class="input-field-two">
          <input v-model="password" type="password" required placeholder="Senha" />
        </div>

        <button class="button-register" type="submit">
          <span class="button-register-text">Cadastrar-se</span>
        </button>

        <div class="register-link">
          <a href="/login" class="register-link-text">Já tem uma conta? Faça login</a>
        </div>
      </form>
    </div>

    <div class="welcome-message">
      Crie sua conta para começar!
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
    async registerUser() {
      try {
        const response = await api.post('/auth/register', {
          username: this.username,
          password: this.password,
        });
        this.message = response.data.message || 'Cadastro realizado com sucesso!';
        this.$router.push('/login'); // Redireciona para a página de login após o cadastro
      } catch (error) {
        this.message = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'Erro ao realizar o cadastro.';
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

  body {
    font-size: 14px;
    font-family: Sarala;
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

  .register-box {
    width: 317px;
    height: 500px;
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

  .register-box-title {
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

  .button-register {
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

  .button-register-text {
    width: 100px;
    color: rgba(255, 255, 255, 1);
    font-family: Sarala;
    font-weight: Bold;
    font-size: 15px;
    text-align: center;
  }

  .register-link {
    width: 257px;
    font-size: 16px;
    text-align: center;
    margin-top: 100px;
  }

  .register-link-text {
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-weight: bold;
    color: black;
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