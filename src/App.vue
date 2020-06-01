<template>
  <v-app>
    <v-navigation-drawer app  v-model="drawer"
    src="https://image.freepik.com/vector-gratis/composicion-fondo-degradado-suave-borrosa-moderna-azul-claro_1053-1199.jpg">
      
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
             CRUD
            </v-list-item-title>
            <v-list-item-subtitle>
              Inscripciones
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item  color="#141414" v-for="item in items" :key="item.title"  link route :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      hide-on-scroll
      prominent
      scroll-target="#scrolling-techniques-4"

       src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title>CRUD Inscripciones</v-toolbar-title>
    
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    

    <v-footer app dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">

          <v-spacer></v-spacer>
    
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>

  
</template>

<script>
export default {
  name: "App",
  data: () => ({
    
    items: [
      
     
      { title: "Inicio", icon: "mdi-account" , route: "/"},
      { title: "Estudiantes", icon: "mdi-account-group" , route: "/estudiantes"},
      { title: "Cursos", icon: "mdi-bookshelf" , route: "/cursos" },
    ],
    drawer: false,
  }),
};


</script>

