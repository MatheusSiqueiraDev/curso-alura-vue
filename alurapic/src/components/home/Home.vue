<template>
  <div>
    <!--<h1 v-text="titulo"></h1>-->
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre por parte do título"> <!-- V-on ou @-->
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
         <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.1" :url="foto.url" :titulo="foto.titulo"/>
            <router-link :to="{name: 'altera', params: {id: foto._id}}">
              <meu-botao tipo="buttom" rotulo="ALTERAR"/>
            </router-link>
            <meu-botao tipo="button" rotulo="REMOVER" v-on:botaoAtivado="remove(foto)" :confirmacao="true" estilo="perigo"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },
  data() {
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },
  computed: {
    fotosComFiltro() {
      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    },
  },
  methods: {
    remove(foto) {
      this.service.apaga(foto._id).then(() => {
        this.mensagem = 'Foto removida com sucesso';
        let indice = this.fotos.indexOf(foto); 
        this.fotos.splice(indice, 1);
        }, err => {
        this.mensagem = err.message;
      });;

      /*this.resource.delete({ id: foto._id }).then(() => {
        this.mensagem = 'Foto removida com sucesso';
        let indice = this.fotos.indexOf(foto); 
        this.fotos.splice(indice, 1);
        }, err => {
        console.log(err);
        this.mensagem = 'Não foi possível remover a foto';
      });;

      this.$http.delete(`v1/fotos/${foto._id}`).then(() => {
        this.mensagem = 'Foto removida com sucesso';
        let indice = this.fotos.indexOf(foto); 
        this.fotos.splice(indice, 1);
        }, err => {
        console.log(err);
        this.mensagem = 'Não foi possível remover a foto';
      });*/
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    this.service.lista().then(fotos => this.fotos = fotos, err => this.mensagem = err.message);

    /*
    this.resource = this.$resource('v1/fotos{/id}');
    this.resource.query().then(res => res.json()).then(fotos => this.fotos = fotos, err => console.log(err));

    let promise = this.$http.get('v1/fotos');
    promise.then(res => res.json()).then(fotos => this.fotos = fotos, err => console.log(err));*/
  }
}
</script>

<style scoped>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
