<template>
  <div>
    <!--<h1 v-text="titulo"></h1>-->
    <h1>{{ titulo }}</h1>
    <ul>
      <li v-for="foto of fotos">
        <img v-bind:src="foto.url" :alt="foto.titulo">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: 'Alurapic',
      fotos: [],
    }
  },
  created() {
    alert("Funcionou!");
  }
}
</script>

<style>

</style>
