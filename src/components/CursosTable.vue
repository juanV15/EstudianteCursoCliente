<template>
  <v-data-table
    :headers="cabeceras"
    :items="cursos"
    sort-by="claveCurso"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar src="https://png.pngtree.com/thumb_back/fw800/background/20190828/pngtree-abstract-light-blue-background-image_302702.jpg">>
        <v-toolbar-title>Cursos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn  color="#167FCD" dark class="mb-2" v-on="on"
              > <v-icon  >
        mdi-account-multiple-plus
      </v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.claveCurso"
                      label="Clave"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.nombreCurso"
                      label="Nombre del Curso"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.numeroCreditos"
                      label="Número de Creditos"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#2EDAFF" text @click="close">Cancelar</v-btn>
              <v-btn color="#2EDAFF" text @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.editar="{ item }">
      <v-icon  class="mr-2" @click="editarCurso(item)">
        mdi-account-edit
      </v-icon>
    </template>
    <template v-slot:item.eliminar="{ item }">
      <v-icon  @click="eliminarCurso(item)">
        mdi-account-minus
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Cursos-Table",
  data: () => ({
    dialog: false,
    cabeceras: [
      {
        text: "Claves",
        align: "start",
        sortable: false,
        value: "clave",
      },
      { text: "Nombre del Curso", value: "nombre" },
      { text: "Número de Creditos", value: "creditos" },
      { text: "Editar", value: "editar", sortable: false },
      { text: "Eliminar", value: "eliminar", sortable: false }
    ],
    cursos: [],
    editedIndex: -1,
    editedItem: {
      claveCurso: "",
      nombreCurso: "",
      numeroCreditos: 0
    },
    defaultItem: {
      claveCurso: "",
      nombreCurso: "",
      numeroCreditos: 0
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Curso" : "Editar Curso";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listarCursos();
  },

  methods: {
    async listarCursos() {
      await this.axios
        .get("/cursos")
        .then((res) => {
          this.cursos = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editarCurso(item) {
      this.editedIndex = this.cursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async eliminarCurso(item) {
      const index = this.cursos.indexOf(item);

      let confirmacion =
        confirm("¿Quieres eliminar este Curso?") &&
        this.cursos.splice(index, 1);

      if (confirmacion) {
        await this.axios
          .delete(`/cursos/${item.claveCurso}`)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async guardar() {
      if (this.editedIndex > -1) {
         const cursoModificar = {
            clave: this.editedItem.claveCurso,
            nombre: this.editedItem.nombreCurso,
            creditos: this.editedItem.numeroCreditos
          };
         
         await this.axios
           .put(
             `/cursos/${this.editedItem.claveCurso}`,
             cursoModificar
           )
           .then((res) => {
             Object.assign(this.cursos[this.editedIndex], this.editedItem);
             console.log(res.data);
           })
           .catch((err) => {
             console.log(err);
           });
      } else {
        await this.axios
          .post("/cursos/", this.editedItem )
          .then((res) => {
            this.cursos.push(this.editedItem);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.close();
    },
  },
};
</script>
