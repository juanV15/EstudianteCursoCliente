<template>
  <v-data-table
    :headers="cabeceras"
    :items="estudiantes"
    sort-by="matricula"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar 
      src="https://png.pngtree.com/thumb_back/fw800/background/20190828/pngtree-abstract-light-blue-background-image_302702.jpg">
        
        <v-toolbar-title>Estudiantes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="#167FCD" dark class="mb-2" v-on="on"
              >
              <v-icon  >
        mdi-account-plus
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
                      v-model="editedItem.matricula"
                      label="Matricula"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.apellidoPaterno"
                      label="Apellido Paterno"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.apellidoMaterno"
                      label="Apellido Materno"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.nombres"
                      label="Nombre(s)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.semestreIngreso"
                      label="Semestre Ingreso"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.creditosCursados"
                      label="Creditos Cursados"
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
      <v-icon class="mr-2" @click="editarEstudiante(item)">
        mdi-account-edit
      </v-icon>
    </template>
    <template v-slot:item.eliminar="{ item }">
      <v-icon @click="eliminarEstudiante(item)">
        mdi-account-minus
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Students-Table",
  data: () => ({
    dialog: false,
    cabeceras: [
      {
        text: "Matriculas",
        align: "start",
        sortable: false,
        value: "matricula",
      },
      { text: "Apellido Paterno", value: "apellidoPaterno" },
      { text: "Apellido Materno", value: "apellidoMaterno" },
      { text: "Nombre(s)", value: "nombres" },
      { text: "Semestre Ingreso", value: "semestreIngreso" },
      { text: "Creditos Cursados", value: "creditosCursados", sortable: false },
      { text: "Editar", value: "editar", sortable: false },
      { text: "Eliminar", value: "eliminar", sortable: false },
    ],
    estudiantes: [],
    editedIndex: -1,
    editedItem: {
      matricula: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      semestreIngreso: 0,
      creditosCursados: 0,
    },
    defaultItem: {
      matricula: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      semestreIngreso: 0,
      creditosCursados: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Estudiante" : "Editar Estudiante";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listarEstudiantes();
  },

  methods: {
    async listarEstudiantes() {
      await this.axios
        .get("/estudiantes")
        .then((res) => {
          this.estudiantes = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editarEstudiante(item) {
      this.editedIndex = this.estudiantes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async eliminarEstudiante(item) {
      const index = this.estudiantes.indexOf(item);

      let confirmacion =
        confirm("¿Quieres eliminar a este Estudiante?") &&
        this.estudiantes.splice(index, 1);

      if (confirmacion) {
        await this.axios
          .delete(`/estudiantes/${item.matricula}`)
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
        const estudianteModificar = {
          matricula: this.editedItem.matricula,
          apellidoPaterno: this.editedItem.apellidoPaterno,
          apellidoMaterno: this.editedItem.apellidoMaterno,
          nombres: this.editedItem.nombres,
          semestreIngreso: this.editedItem.semestreIngreso,
          creditosCursados: this.editedItem.creditosCursados,
        };

        await this.axios
          .put(
            `/estudiantes/${this.editedItem.matricula}`,
            estudianteModificar
          )
          .then((res) => {
            Object.assign(this.estudiantes[this.editedIndex], this.editedItem);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await this.axios
          .post("/estudiantes", this.editedItem)
          .then((res) => {
            this.estudiantes.push(this.editedItem);
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
